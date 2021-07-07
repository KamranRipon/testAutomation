
import { onChatAre } from "../../support/page_objects/chatAreaPage"

describe ('dChatbot Test Suit', () => {

    beforeEach('Open Chat page', () => {

        //cy.clearCookies()
        cy.visit('/')
        cy.wait(3000) 
    })

    it('Chat area testing', () => {
        
        onChatAre.titleOfThePage()
        onChatAre.chatLayoutPage()
        onChatAre.botResponseTime()
    })

    it('Verification of the Browser API Calls', () => {
        onChatAre.testBackend()
    })

    it('Test Feedback', () => {
        onChatAre.testFeedback()
    })

    it('Test of Viewport', () => {
        onChatAre.testViewport()

    })

    it.only('Test Features', () => {
        onChatAre.testFeatures()
    })

    it('iFrame Test', () => {
        onChatAre.iFrame()
    })

})