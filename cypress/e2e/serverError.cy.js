describe('Server error', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('shows an error message when the server fails', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { statusCode: 500 }
    ).as('serverError')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@serverError')
      .its('response.statusCode')
      .should('be.equal', 500)

    cy.contains(
      '.error span',
      'Oops, something went wrong. Refresh the page and try again.'
    ).should('be.visible')
  })
})
