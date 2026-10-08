import { homePage } from '../pages/home.page'
import { stubAlert, verifyAlert } from '../support/helpers'
import testData from '../fixtures/test-data.json'

describe('Authentication', () => {
  const password = testData.users.defaultPassword
  const registeredUsername = `qa_auth_${Date.now()}`

  before(() => {
    homePage.visit()
    homePage.signUp(registeredUsername, password)
  })

  beforeEach(() => {
    homePage.visit()
  })

  it('Verify successful user registration', () => {
    // Generate a unique username to avoid conflicts in the shared demo environment
    const username = `qa_signup_${Date.now()}`

    homePage.openSignUpModal()
    homePage.enterSignUpUsername(username)
    homePage.enterSignUpPassword(password)
    stubAlert()
    homePage.submitSignUp()

    verifyAlert('Sign up successful.')
  })

  it('Verify successful login with valid credentials', () => {
    homePage.login(registeredUsername, password)

    homePage.verifyLoggedIn(registeredUsername)
  })

  it('Verify login fails with invalid credentials', () => {
    stubAlert()
    homePage.login(registeredUsername, testData.users.invalidPassword)

    verifyAlert('Wrong password.')
    homePage.verifyLoggedOut()
  })

  it('Verify successful logout', () => {
    homePage.login(registeredUsername, password)
    homePage.logout()

    homePage.verifyLoggedOut()
  })
})
