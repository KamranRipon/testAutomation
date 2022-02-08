import { onSynonym } from "../support/page_objects/Synonym/Synonyms"

describe ('Test Case 7: Synonyms', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Synonym Anlegen', () => {
        onSynonym.synonymAnlegen()
    })

    it('Test Case: Synonym Bearbeiten', () => {
        onSynonym.synonymBearbeiten()
    })

    it('Test Case: Synonym Loeschen', () => {
        onSynonym.synonymLoeschen()
    })

    it('Test Case: Synonym Suchen', () => {
        onSynonym.synonymSuchen()
    })

})