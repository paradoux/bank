// Node modules imports
require("dotenv").config()
const axios = require("axios")

// App imports
const {AppError} = require("./error")
const {
  loginConfig,
  createAccountsRequestConfig,
  sumAccountsBalances
} = require("./utils")

// Login to Bridge API and return access_token to be used later
const loginToApi = async () => {
  try {
    const results = await axios(loginConfig)
    return results.data.access_token
  } catch (error) {
    throw new AppError(400, "Can't login to external API", error)
  }
}

// Call Bridge API for the user's accounts and return the list of all the accounts
const queryBankData = async accountsRequestConfig => {
  try {
    const results = await axios(accountsRequestConfig)
    return results.data.resources
  } catch (error) {
    throw new AppError(500, "Can't retrieve data from Bridge API", error)
  }
}

// Login, retrieves the list of accounts, computes the total balance and logs it
const loginAndRetrieveTotalBalance = async () => {
  try {
    // Login and store the access token in a variable
    const accessToken = await loginToApi()

    // Create the configfor an API call to Bridge API with the accessToken from the login
    const accountsRequestConfig = createAccountsRequestConfig(accessToken)

    // Retrieve the accounts list of the user
    const accountsList = await queryBankData(accountsRequestConfig)

    // Compute the total balance of all the accounts and returns the result
    const totalBalance = await sumAccountsBalances(accountsList)
    console.log(totalBalance)
    return totalBalance
  } catch (error) {
    console.log(error)
  }
}

loginAndRetrieveTotalBalance()

module.exports = {loginToApi, queryBankData, loginAndRetrieveTotalBalance}
