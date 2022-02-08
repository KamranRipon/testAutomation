import { onEntity } from "../support/page_objects/Entity/Entity"

describe("Test Case 5: Entity", () => {

    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        cy.wait(500)
        cy.visit('/', {force:true})
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Entity Hinzufuegen", () => {
        onEntity.entityHinzufuegen()
    })

    it("Entity Suchen", () => {
        onEntity.entitySuchen()
    })

    it("Entity Bearbeiten", () => {
        onEntity.entityBearbeiten()
    })
})