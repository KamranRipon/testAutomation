import { onIntent } from "../support/page_objects/Intent/Intents"

describe ('Test Case - 3: Intent', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        //cy.wait(1500)
    })

    it('Test Case: Intents hinzufuegen', () => {
        onIntent.intents()
        //onFrontend.Entities()
    })

    it('Test Case: Intent bearbeiten', () => {
        onIntent.intent_bearbeiten()
    })

    it('Test Case: Intent suchen', () => {
        onIntent.intent_suchen()
    })

    it('Test Case: Intent Example hinzufuegen', () => {
        onIntent.intentExampleHinzufuegen()
    })

    it('Test Case: Intent Example Suchen', () => {
        onIntent.intentExampleSuchen()
    })

    it('Test Case: Intent Example Loeschen', () => {
        onIntent.intentExampleLoeschen()
    })
})