/// <reference types="cypress"/>


describe('Titter Clone - Login', () => {
    it('login com user e pwd validos direcionam ao feed', () => {

        cy.intercept({
            method: 'GET',
            hostname: 'res.cloudinary.com'

        }, {
            statusCode: 200,
            fixture: 'photo'

        }).as('cloudinary')

        cy.login()

        cy.visit('/');

        cy.get('nav ul li')
            .should('be.visible')
            .and('have.length', 6)
    });

    it('click on tweet button and types a message', () => {

        cy.get('textarea[type="text"]').type("automated tweet by morgs code")
        cy.get('button[class="sc-fzplWN pDAkO"]').click()
    });
})