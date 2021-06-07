/// <reference types="cypress" />
describe('test all optional features', () => {
    before(() => {
        cy.initSession()
    })

    it('should have at least one message', () => {
        cy.get('[data-cy="messageContainer"]')
            .should('not.have.length', 0)
    })

    if (Cypress.env('PRIVACY_NOTICE')) {
        context('Privacy Policy', () => {
            it('should have a visible show privacy policy button', () => {
                cy.get('[data-cy="showPrivacyPolicyBtn"]')
                    .should('be.visible')
            })

            it('should show privacy policy when clicking the button', () => {
                cy.get('[data-cy="showPrivacyPolicyBtn"]')
                    .click()
                cy.get('.v-dialog')
                    .should('be.visible')
            })

            it('should show an error when submitting without input', () => {
                cy.get('[data-cy="deletePreviousChatBtn"]')
                    .click()
                cy.get('[data-cy="previousChatCodeInputField"]')
                    .prev().should('have.class', 'error--text')
                cy.get('.v-text-field__details')
                    .contains('Chat Code muss angegeben werden')
            })

            it('should show an error when no input was made', () => {
                cy.get('[data-cy="previousChatCodeInputField"]')
                    .clear()
                    .focus()
                    .blur()
                    .prev().should('have.class', 'error--text')
                cy.get('.v-text-field__details')
                    .contains('Chat Code muss angegeben werden')
            })

            it('should show an error when input is shorter then 16 chars', () => {
                cy.get('[data-cy="previousChatCodeInputField"]')
                    .clear()
                    .type('0')
                    .prev().should('have.class', 'error--text')
                cy.get('.v-text-field__details')
                    .contains('Chat Code muss 16 Zeichen lang sein')
            })

            it('should show an error when input is longer then 16 chars', () => {
                cy.get('[data-cy="previousChatCodeInputField"]')
                    .clear()
                    .type('012345678910111213')
                    .prev().should('have.class', 'error--text')
                cy.get('.v-text-field__details')
                    .contains('Chat Code muss 16 Zeichen lang sein')
            })

            it('should show NO error when input is 16 chars', () => {
                cy.get('[data-cy="previousChatCodeInputField"]')
                    .clear()
                    .type('0123456789101112')
                    .prev().should('not.have.class', 'error--text')
            })

            it('should close dialog when clicking the close button', () => {
                cy.get('[data-cy="privacyPolicyDialogCloseBtn"]')
                    .click()
                cy.get('.v-dialog')
                    .should('not.be.visible')
            })
        })
    }

    if (Cypress.env('EMOJI_PICKER')) {
        context('Emoji-Picker', () => {
            let selectedEmoji

            it('should have a visible show emoji dialog button', () => {
                cy.get('[data-cy="showEmojiDialogBtn"]')
                    .should('be.visible')
            })

            it('should show emoji dialog when clicking the button', () => {
                cy.get('[data-cy="showEmojiDialogBtn"]')
                    .click()
                cy.get('.emoji-picker')
                    .should('be.visible')
            })

            it('should have at least one emoji in dialog', () => {
                cy.get('[data-cy="emojiPickerContainer"]')
                    .get('.emoji')
                    .should('not.have.length', 0)
            })

            it('should show emoji in input field when clicking on an emoji', () => {
                selectedEmoji = cy.get('[data-cy="emojiPickerContainer"]')
                    .get('.emoji')
                    .last()
                selectedEmoji.click()
                cy.get('[data-cy="chatInputField"]')
                    .invoke('val')
                    .should('not.be.empty')
            })

            it('should close dialog when clicking the close button', () => {
                cy.get('[data-cy="emojiPickerCloseBtn"]')
                    .click()
                cy.get('.emoji-picker')
                    .should('not.be.visible')
            })

            it('should show emoji in message when submitting', () => {
                cy.get('[data-cy="sendMessageBtn"]')
                    .click()
                cy.get('[data-cy="messageContainer"]')
                    .last()
                    .contains('🎉️')
            })
        })
    }

    if (Cypress.env('DIALOG_FEEDBACK')) {
        context('closing the chat ', () => {
            it('should show feedback close dialog when clicking the close button', () => {
                cy.get('[data-cy="closeChatWindowBtn"]')
                    .click()

                cy.get('[data-cy="feedbackDialogTitle"]')
                    .contains('Feedback')

                cy.get('[data-cy="feedbackDialogText"]')
                    .contains('Waren Sie zufrieden mit der Nutzung der Digitalen Assistenz?')

                cy.get('.v-dialog .v-radio')
                    .should('have.length', 3)
            })

            it('should close dialog when clicking the abort button', () => {
                cy.get('[data-cy="abortFeedbackBtn"]')
                    .click()

                cy.get('.v-dialog')
                    .should('not.be.visible')
            })

            it('should show dialog again and close chat when clicking the confirm button', () => {
                cy.get('[data-cy="closeChatWindowBtn"]')
                    .click()

                cy.get('.v-dialog')
                    .should('be.visible')

                cy.get('[data-cy="sendFeedbackBtn"]')
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