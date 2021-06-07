/// <reference types="cypress" />
describe('test all basic features', () => {
    before(() => {
        cy.initSession()
    })

    it('should have at least one message', () => {
        cy.get('[data-cy="messageContainer"]')
            .should('not.have.length', 0)
    })

    context('user chat input', () => {
        it('should behave correctly with different user inputs', () => {
            cy.get('[data-cy="chatInputField"]')
                .clear()
                .focus()
                .type('test input 10')
                .should('have.value', 'test input 10')
                .type('{movetostart}{del}T')
                .should('have.value', 'Test input 10')
                .type('{movetoend}{backspace}')
                .should('have.value', 'Test input 1')
                .type('{selectall}{backspace}')
                .should('have.value', '')
        })

        it('should display user message when user enters text and hits return', () => {
            cy.get('[data-cy="chatInputField"]')
                .clear()
                .type('Test input 2 {enter}')
            cy.get('[data-cy="messageContainer"]')
                .contains('Test input 2')
        })

        it('should display "' + Cypress.env('BOT_NAME') + ' schreibt..." while waiting for bot response', () => {
            cy.get('.v-text-field__details')
                .contains(Cypress.env('BOT_NAME') + ' schreibt...')
        })

        it('should display user message when user enters text and clicks submit button', () => {
            cy.get('[data-cy="chatInputField"]')
                .clear()
                .type('Test input 3')
            cy.get('[data-cy="sendMessageBtn"]')
                .click()
            cy.get('[data-cy="messageContainer"]')
                .contains('Test input 3')
        })
    })

    context('increase/decrease font size', () => {
        it('should have a default font size of 14px', () => {
            cy.get('[data-cy="messageContainer"]')
                .first()
                .get('p')
                .invoke('css', 'font-size')
                .should('equal', '14px')
        })

        it('should have a disabled decrease button by default', () => {
            cy.get('[data-cy="decreaseFontSizeBtn"]')
                .should('be.disabled')
        })

        it('should increase font size after increase button click', () => {
            cy.get('[data-cy="increaseFontSizeBtn"]')
                .click()
            cy.get('[data-cy="messageContainer"]')
                .first()
                .get('p')
                .invoke('css', 'font-size')
                .should('equal', '16.8px')
        })

        it('should now have a enabled decrease button', () => {
            cy.get('[data-cy="decreaseFontSizeBtn"]')
                .should('be.enabled')
        })

        it('should have disabled increase button after two more clicks', () => {
            cy.get('[data-cy="increaseFontSizeBtn"]')
                .click()
                .click()
                .should('be.disabled')
        })

        it('should decrease font size after decrease button click', () => {
            cy.get('[data-cy="decreaseFontSizeBtn"]')
                .click()
            cy.get('[data-cy="messageContainer"]')
                .first()
                .get('p')
                .invoke('css', 'font-size')
                .should('equal', '19.6px')
        })

        it('should now have a enabled increase button again', () => {
            cy.get('[data-cy="increaseFontSizeBtn"]')
                .should('be.enabled')
        })

        it('should have disabled decrease button after two more clicks', () => {
            cy.get('[data-cy="decreaseFontSizeBtn"]')
                .click()
                .click()
                .should('be.disabled')
        })
    })

    context('sound on/off', () => {
        it('should have a enabled sound button by default', () => {
            cy.get('[data-cy="soundOffBtn"]')
                .should('be.visible')
        })

        it('should toggle sound button on click', () => {
            cy.get('[data-cy="soundOffBtn"]')
                .click()
            cy.get('[data-cy="soundOnBtn"]')
                .should('be.visible')
            cy.get('[data-cy="soundOnBtn"]')
                .click()
            cy.get('[data-cy="soundOffBtn"]')
                .should('be.visible')
            cy.log(typeof Cypress.env('DIALOG_FEEDBACK'))
        })

        // ToDo: check if realy no sound is playing
    })
    
    if (!Cypress.env('DIALOG_FEEDBACK')) {
        context('closing the chat ', () => {
            it('should show default close dialog when clicking the close button', () => {
                cy.get('[data-cy="closeChatWindowBtn"]')
                    .click()

                cy.get('[data-cy="chatDialogTitle"]')
                    .contains('Chat beenden')

                cy.get('[data-cy="chatDialogText"]')
                    .contains('Ein Klick auf OK beendet den Chat. Alle bisherigen Eingaben gehen verloren.')
            })

            it('should close dialog when clicking the abort button', () => {
                cy.get('[data-cy="chatDialogAbortBtn"]')
                    .click()

                cy.get('.v-dialog')
                    .should('not.be.visible')
            })

            it('should show dialog again and close chat when clicking the confirm button', () => {
                cy.get('[data-cy="closeChatWindowBtn"]')
                    .click()

                cy.get('.v-dialog')
                    .should('be.visible')

                cy.get('[data-cy="chatDialogConfirmBtn"]')
                    .click()

                cy.get('.v-dialog')
                    .should('not.be.visible')

                cy.get('[data-cy="messageContainer"]')
                    .should('have.length', 0)
            })

            it('should start a new chat', () => {
                cy.get('.v-text-field__details')
                    .contains(Cypress.env('BOT_NAME') + ' schreibt...')

                cy.get('[data-cy="messageContainer"]')
                    .should('not.have.length', 0)
            })
        })
    }
})
