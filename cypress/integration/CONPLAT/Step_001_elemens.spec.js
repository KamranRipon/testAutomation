/// <reference types="cypress" />

Cypress.env('VIEWPORTS').forEach(viewport => {
    context('all basic elements should exist and be visible [ ' + viewport[0].toUpperCase() + ' ' + viewport[1] + 'x' + viewport[2] + ' ]', () => {
        before(() => {
            if (viewport[0] !== 'default') {
                cy.viewport(viewport[0])
            }
            cy.initSession()
        })

        it('should have the correct and visible title', () => {
            cy.get('[data-cy="chatTitle"]')
                .should('have.text', Cypress.env('TITLE'))
                .should('be.visible')
        })
        
        it('should have a visible close button', () => {
            cy.get('[data-cy="closeChatWindowBtn"]')
                .should('be.visible')
        })

        it('should have a visible text input field', () => {
            cy.get('[data-cy="chatInputField"]')
                .should('be.visible')
        })

        it('should have a visible send message button', () => {
            cy.get('[data-cy="sendMessageBtn"]')
                .should('be.visible')
        })

        it('should have a visible increase font size button', () => {
            cy.get('[data-cy="increaseFontSizeBtn"]')
                .should('be.visible')
        })

        it('should have a visible decrease font size button', () => {
            cy.get('[data-cy="decreaseFontSizeBtn"]')
                .should('be.visible')
        })

        it('should have a visible sound off button', () => {
            cy.get('[data-cy="soundOffBtn"]')
                .should('be.visible')
        })

        it('should have at least one greeting message', () => {
            cy.get('[data-cy="messageContainer"]')
                .should('not.have.length', 0)
        })
    })

    context('all configured elements should exist and be visible [ ' + viewport[0].toUpperCase() + ' ' + viewport[1] + 'x' + viewport[2] + ' ]', () => {
        before(() => {
            if (viewport[0] !== 'default') {
                cy.viewport(viewport[0])
            }
            cy.initSession()
        })

        if (Cypress.env('BOT_IMAGE') !== '') {
            it('should have an chat bot icon on messages', () => {
                cy.get('[data-cy="messageContainer"]')
                    .should('not.have.length', 0)
                if (viewport[1] < 576) {
                    cy.get('[data-cy="chatbotIcon"]')
                        .should('not.be.visible')
                } else {
                    cy.get('[data-cy="chatbotIcon"]')
                        .should('be.visible')
                }

            })
        }

        if (Cypress.env('MESSAGE_FEEDBACK')) {
            it('should have NO visible feedback buttons button', () => {
                cy.get('[data-cy="messageContainer"]')
                    .should('not.have.length', 0)
                cy.get('[data-cy="chatMessageFeedback"]')
                    .should('not.exist')
            })
        }

        if (Cypress.env('PRIVACY_NOTICE')) {
            it('should have a visible show privacy policy button', () => {
                cy.get('[data-cy="showPrivacyPolicyBtn"]')
                    .should('be.visible')
            })
        }

        if (Cypress.env('LANGUAGE_SWITCH')) {
            it('should have a visible activate easy language button', () => {
                cy.get('[data-cy="activateEasyLanguageBtn"]')
                    .should('be.visible')
            })
        }

        if (Cypress.env('LANGUAGE_MENU')) {
            it('should have a visible show language menu button', () => {
                cy.get('[data-cy="showLanguageMenuBtn"]')
                    .should('be.visible')
            })
        }

        if (Cypress.env('EMOJI_PICKER')) {
            it('should have a visible show emoji dialog button', () => {
                cy.get('[data-cy="showEmojiDialogBtn"]')
                    .should('be.visible')
            })
        }
    })
})
