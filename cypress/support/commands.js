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

Cypress.Commands.add('initSession', () => {
    if (!Cypress.env('STUB_REQUESTS')) {
        cy.visit(Cypress.env('WEBUI_BASE_URL'))
    } else {
        //ToDo stub request
        cy.visit(Cypress.env('WEBUI_BASE_URL'))
    }
})

Cypress.Commands.add('assertOnline', () => {
    return cy.wrap(window).its('navigator.onLine').should('be.true')
})

Cypress.Commands.add('assertOffline', () => {
    return cy.wrap(window).its('navigator.onLine').should('be.false')
})

Cypress.Commands.add('goOffline', () => {
    cy.log('**go offline**').then(() => {
        return Cypress.automation('remote:debugger:protocol', { command: 'Network.enable' })
    }).then(() => {
        return Cypress.automation('remote:debugger:protocol', {
            command: 'Network.enable',
            params: {
                offline: true,
                latency: -1,
                downloadThroughput: -1,
                uploadThroughput: -1,
            }
        })
    })
})

// Iframe Testing

Cypress.Commands.add('getIframe', (iframe) => {
    return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)
})