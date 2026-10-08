export function stubAlert() {
  cy.window().then((window) => {
    cy.stub(window, 'alert').as('windowAlert')
  })
}

export function verifyAlert(expectedMessage: string) {
  cy.get('@windowAlert')
    .should('have.been.calledOnceWith', expectedMessage)
}
