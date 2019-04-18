// App imports
const {email, password, client_id, secret_id} = require("../config")
const {AppError} = require("../error")
const {createAccountsRequestConfig, sumAccountsBalances} = require("../utils")

describe("Testing createAccountsRequestConfig", () => {
  test("it should return error when no access token provided", () => {
    expect(() => {
      // Call createAccountsRequestConfig without access token
      createAccountsRequestConfig()
    }).toThrowError(new AppError(500, "No access token provided"))
  })
  test("it should return the correct config when correct access token provided", () => {
    // Create a mock access token
    const mockAccessToken =
      "de8b46e397d493b71f6e02a7186a4a7a92e3d923-ef3c9c5f-a6e5-4a83-952a-e15e6d893951"

    // Create a mock request config
    const mockRequestConfig = {
      method: "get",
      url: "https://sync.bankin.com/v2/accounts",
      params: {
        client_id,
        client_secret: secret_id
      },
      headers: {
        Authorization: `Bearer de8b46e397d493b71f6e02a7186a4a7a92e3d923-ef3c9c5f-a6e5-4a83-952a-e15e6d893951`,
        "Bankin-Version": "2018-06-15"
      }
    }

    // Store the config returned from createAccountsRequestConfig
    const returnedConfig = createAccountsRequestConfig(mockAccessToken)

    expect(returnedConfig.headers.Authorization).toEqual(
      mockRequestConfig.headers.Authorization
    )
  })
})

describe("Testing sumAccountsBalances", () => {
  test("it should return an error when no accounts list provided", () => {
    expect(() => {
      // Call sumAccountsBalances without accounts list
      sumAccountsBalances()
    }).toThrowError(new AppError(500, "No accounts list provided"))
  })
  test("it should return the correct config when correct access token provided", () => {
    // Create mock accounts list
    const mockAccountsList = [
      {
        id: 2341501,
        name: "Compte Crédit Immobilier",
        balance: -140200,
        status: 0,
        item: {
          id: 187746,
          resource_uri: "/v2/items/187746",
          resource_type: "item"
        },
        bank: {
          id: 408,
          resource_uri: "/v2/banks/408",
          resource_type: "bank"
        },
        last_refresh_date: "2016-04-06T13:53:12Z",
        loan_details: {
          next_payment_date: "2016-04-30",
          next_payment_amount: 1000,
          maturity_date: "2026-12-31",
          opening_date: "2013-01-10",
          interest_rate: 1.25,
          type: "Prêtimmobilier",
          borrowed_capital: 140200,
          repaid_capital: 40200,
          remaining_capital: 100000
        },
        savings_details: null,
        resource_uri: "/v2/accounts/2341501",
        resource_type: "account"
      },
      {
        id: 2341501,
        name: "Compte Crédit Immobilier",
        balance: 140201,
        status: 0,
        item: {
          id: 187746,
          resource_uri: "/v2/items/187746",
          resource_type: "item"
        },
        bank: {
          id: 408,
          resource_uri: "/v2/banks/408",
          resource_type: "bank"
        },
        last_refresh_date: "2016-04-06T13:53:12Z",
        loan_details: {
          next_payment_date: "2016-04-30",
          next_payment_amount: 1000,
          maturity_date: "2026-12-31",
          opening_date: "2013-01-10",
          interest_rate: 1.25,
          type: "Prêtimmobilier",
          borrowed_capital: 140200,
          repaid_capital: 40200,
          remaining_capital: 100000
        },
        savings_details: null,
        resource_uri: "/v2/accounts/2341501",
        resource_type: "account"
      }
    ]
    // Store the total of the accounts balances returned from mockAccountsList
    const totalBalance = sumAccountsBalances(mockAccountsList)

    expect(totalBalance).toEqual(1)
  })
})
