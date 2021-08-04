
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10):0;

    return minutes
}
export class chatArea {

    titleOfThePage() {
        cy.get('title').should('contain', 'Conplat')
    }

    chatLayoutPage(){
                
        var textList = ['Moin', "Wie ghets dir"]
        
        cy.wait(2500)
        cy.wrap(textList).each((index) => {
            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
            cy.wait(1500)
        })
    }

    botResponseTime(){

        let timestampUser, timestampBot
        
        cy.get('[id="chat-message-3"]').find('[data-cy="chatMessageTimestamp"]')
            .then( ($userMessage) => {
                const timestampUser = $userMessage.text()
                cy.log('User send message time:' + timeStringToFloat(timestampUser))
        })

        cy.get('[id="chat-message-4"]').find('[data-cy="chatMessageTimestamp"]')
            .then( botResponse => {
                const timestampBot = botResponse.text()
                cy.log(timeStringToFloat(timestampBot))
        })
         
        const responseTime = timestampBot - timestampUser

        if (responseTime > 0) {
            cy.log('Response Time Positive')
            
        } else {
            cy.log('Response Time Negative, Mark as Bug')
        }
        
    }

    testBackend(){
        cy.server()
        cy.intercept('POST', '**/socket.io/**').as('sessionInitialization')

        var textList = ["Hallo","Wie ghets dir"]
        
        cy.wrap(textList).each((index) => {

            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
            cy.wait(2000)
        })
        cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {

            cy.wrap(thumbsUP).contains('thumb_up').click()
        })
        
        cy.get('@sessionInitialization').then( xhr => {
            if(console.log(xhr)) {
                expect(xhr.response.statusCode).to.equal(200)
                expect(xhr.response.body).to.equal('OK')
                expect(xhr.response.statusMessage).to.equal('OK')
            }
        })
    }
    testFeedback(){

        var textList = ["Hallo","Wie ghets dir"]
        cy.wait(2500)
        cy.wrap(textList).each((index) => {

            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
            cy.wait(2000)
        })
        cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {
            cy.wrap(thumbsUP).contains('thumb_up').click()
        })

        cy.get('[data-cy="feedbackRatingGoodBtn"]')
            .invoke('attr', 'style')
                .should('equal', 'color: black !important;')
            
        cy.get('[data-cy="feedbackRatingBadBtn"] i').then( thumbsDown => {
            cy.wrap(thumbsDown)
                .contains('thumb_down').click()
        })

        cy.get('.v-card__text')
            .find('[data-cy="userQuestionInputField"]')
                .type('ich habe keine frage')

        cy.get('.v-card__text')
            .find('[data-cy="userExpectationsInputField"]')
                .type('Gar Nichts!')
        
        cy.get('.v-card__actions')
            .find('[data-cy="sendFeedbackBtn"]').click()

        cy.get('[data-cy="feedbackRatingBadBtn"] i').then( thumbsDown => {
            cy.wrap(thumbsDown).contains('thumb_down')
                .click()
        })

        cy.get('[data-cy = "feedbackDialogTitle"]')
            .find('[data-cy="feedbackDialogCloseBtn"]').click()

        cy.get('[data-cy="closeChatWindowBtn"]').click()
        
        cy.get('[class="v-input__control"]')
            .contains('Ja').click()
        
        cy.get('[class="v-input__control"]')
            .contains('keine Angabe').click()

        cy.get('[class="v-input__control"]')
            .contains('Nein').click()
        
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="feedbackDialogInputField"]').type(' No Feedback')
        
        cy.get('[class="v-card v-sheet theme--light"]')
            .find('[data-cy="sendFeedbackBtn"]').click()
        
        cy.get('[data-cy="closeChatWindowBtn"]').click()

        cy.get('[class="v-card v-sheet theme--light"]')
            .find('[data-cy="abortFeedbackBtn"]').click()
    }

    testFeatures(){
        // test Emoji Picker
        // cy.get('[data-cy="emojiPicker"]').should('be.visible')
        // cy.get('[data-cy="emojiPicker"]')
        //     .find('[data-cy="showEmojiDialogBtn"]').click()

        // cy.get('[class="emoji-picker v-card v-sheet theme--light"]')
        //     .find('[aria-label="red heart emoji"]')
        //         .click()
            
        // cy.get('[data-cy = "emojiPickerTitle"]')
        //     .find('[data-cy="emojiPickerCloseBtn"]').click()

        // cy.get('[class="flex shrink px-2"]')
        //     .contains('i','send').click()

        // test Increase & Decrease Font Size
        cy.get('[id="chat-message-0"] p')
            .invoke('css', 'font-size')
                .should('equal', '14px')

        let fontSize = 14

        for(let n=0; n<3; n++){
            fontSize = fontSize + 2.80
            cy.get('[data-cy = "chatSettings"]')
                .find('[data-cy = "increaseFontSizeBtn"]')
                    .click()

        cy.get('[id="chat-message-0"] p')
        .invoke('css', 'font-size')
            .should('equal', fontSize.toFixed(1)+'px')
        }

        for(let n=0; n<3; n++){
            fontSize = fontSize - 2.8
            cy.get('[data-cy = "chatSettings"]')
                .find('[data-cy = "decreaseFontSizeBtn"]')
                    .click()
        }
        cy.get('[data-cy = "chatSettings"]')
                .find('[data-cy = "decreaseFontSizeBtn"]')
                    .should('be.disabled')
        
        cy.get('[data-cy="soundOffBtn"] i')
            .should('contain', 'volume_up')
                .click()

        cy.get('[data-cy="soundOnBtn"] i')
            .should('contain', 'volume_off')

        // test Privacy
        // cy.get('[data-cy="showPrivacyPolicyBtn"]').click()

        // cy.get('[data-cy="currentChatCode"]').invoke('text').then( (texxt) => {
            
        //     cy.get('[data-cy="previousChatCodeInputField"]').type(texxt)
        //     cy.wait(500)
        //     cy.get('[data-cy="privacyPolicyDialogCloseBtn"]').click()
            
        // })
        
    }

    testViewport(){

        const sizes = ['iphone-6', 'iphone-8', [1024,768]]
        var textList = ["Moin Moin","Wie ghets dir"]
        cy.wait(3000)

        sizes.forEach((size) => {
            if(Cypress._.isArray(size)){
                cy.viewport(size[0], size[1])
            } else {
                cy.viewport(size)
            }

            cy.wrap(textList).each((index) => {

                cy.get('[type="text"]').type(index)
                cy.contains('i', 'send').click()
                cy.wait(1500)
            })
            cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {
                
                cy.wrap(thumbsUP).contains('thumb_up').click()
                
            })
        })
    }

    iFrame(){
        //cy.getIframe().clear().type()
    }
}

export const onChatAre = new chatArea()