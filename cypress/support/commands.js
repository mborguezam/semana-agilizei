// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {

    cy.token().then(response => {
      const { token, user } = response.body.data.login
  
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify(user))
    })
  
  })
  
  Cypress.Commands.add('token', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}`,
      body: {
        "operationName": "login",
        "variables": {
          "email": "mrg@email.com",
          "password": "T&st&"
        },
        "query": "mutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n    user {\n      id\n      handle\n      avatar\n      fullname\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    })
  })