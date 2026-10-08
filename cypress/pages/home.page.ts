const selectors = {
  signUpLink: '#signin2',
  signUpModal: '#signInModal',
  signUpUsername: '#sign-username',
  signUpPassword: '#sign-password',
  loginLink: '#login2',
  loginModal: '#logInModal',
  loginUsername: '#loginusername',
  loginPassword: '#loginpassword',
  loggedInUser: '#nameofuser',
  logoutLink: '#logout2',
} as const

const labels = {
  signUp: 'Sign up',
  login: 'Log in',
} as const

class HomePage {
  visit() {
    cy.visit('/')
  }

  openSignUpModal() {
    cy.get(selectors.signUpLink).click()
    cy.get(selectors.signUpModal).should('be.visible')
  }

  enterSignUpUsername(username: string) {
    cy.get(selectors.signUpUsername).type(username)
  }

  enterSignUpPassword(password: string) {
    cy.get(selectors.signUpPassword)
      .should('be.visible')
      .click()
      .clear()
      .type(password, { delay: 50 })
  }

  submitSignUp() {
    cy.get(selectors.signUpModal)
      .contains('button', labels.signUp)
      .click()
  }

  signUp(username: string, password: string) {
    this.openSignUpModal()
    this.enterSignUpUsername(username)
    this.enterSignUpPassword(password)
    this.submitSignUp()
  }

  openLoginModal() {
    cy.get(selectors.loginLink).click()
    cy.get(selectors.loginModal).should('be.visible')
  }

  enterLoginUsername(username: string) {
    cy.get(selectors.loginUsername).type(username)
  }

  enterLoginPassword(password: string) {
    cy.get(selectors.loginPassword)
      .should('be.visible')
      .click()
      .clear()
      .type(password, { delay: 50 })
  }

  submitLogin() {
    cy.get(selectors.loginModal)
      .contains('button', labels.login)
      .click()
  }

  login(username: string, password: string) {
    this.openLoginModal()
    this.enterLoginUsername(username)
    this.enterLoginPassword(password)
    this.submitLogin()
  }

  verifyLoggedIn(username: string) {
    cy.get(selectors.loggedInUser)
      .should('be.visible')
      .and('contain', `Welcome ${username}`)
  }

  logout() {
    cy.get(selectors.logoutLink).click()
  }

  verifyLoggedOut() {
    cy.get(selectors.loggedInUser).should('not.be.visible')
    cy.get(selectors.loginLink).should('be.visible')
  }
}

export const homePage = new HomePage()
