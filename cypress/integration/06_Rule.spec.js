import { onRules } from "../support/page_objects/Rule/Rules"

describe ('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Rules Anlegen', () => {
        onRules.rulesAnlegen()
    })

    it('Test Case: Rules Bearbeiten', () => {
        onRules.rulesBearbeiten()
    })

    it('Test Case: Rules Suchen', () => {
        onRules.rulesSuchen()
    })

    it('Test Case: Rules Loeschen', () => {
        onRules.rulesLoeschen()
    })
})