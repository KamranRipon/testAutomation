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

const { capitalize } = require("lodash")

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/login')
        
        cy.get('[class="v-input__slot"]').contains('Benutzername').click({force:true})
                .type(username)
        cy.get('[class="v-text-field__slot"]').contains('Passwort').click({force:true})
                .type(password)

        cy.get('[class="v-input--selection-controls__input"]').click()
        
        cy.get('[class="v-btn__content"]').contains('Anmelden').click()
        cy.wait(1000)
        //cy.visit('http://localhost/trainingsdaten/intent/')
    })
    
})

Cypress.Commands.add('loginiFunction',(Username, Password) => {
    // Login Function
    cy.get('[class="v-input__slot"]')
        .contains('Benutzername')
        .click({force:true})
        .type('admin')

    cy.get('[class="v-text-field__slot"]')
        .contains('Passwort')
        .click({force:true})
        .type('cciAdmin#2022+')

    cy.get('[class="v-input--selection-controls__input"]').click()
    
    cy.get('[class="v-btn__content"]')
        .contains('Anmelden')
        .click()
})