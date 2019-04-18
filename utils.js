// Node modules imports
const axios = require("axios")

// App imports
const {AppError} = require("./error")
const {email, password, client_id, secret_id} = require("./config")

// Centralize informations needed for a Login request to Bridge API
module.exports.loginConfig = {
  method: "post",
  url: "https://sync.bankin.com/v2/authenticate",
  params: {
    email,
    password,
    client_id,
    client_secret: secret_id
  },
  headers: {
    "Bankin-Version": "2018-06-15"
  }
}

// Centralize informations needed for Get request to Accounts Bridge API
module.exports.createAccountsRequestConfig = accessToken => {
  if (accessToken) {
    return {
      method: "get",
      url: "https://sync.bankin.com/v2/accounts",
      params: {
        client_id,
        client_secret: secret_id
      },
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the access token in the headers to authenticate
        "Bankin-Version": "2018-06-15"
      }
    }
  } else {
    throw new AppError(500, "No access token provided")
  }
}

// Sums the balances of all the accounts of a user
module.exports.sumAccountsBalances = accounts => {
  if (accounts) {
    return accounts.reduce(
      (sum, currentAccount) => (sum += currentAccount.balance),
      0
    )
  } else {
    throw new AppError(500, "No accounts list provided")
  }
}
