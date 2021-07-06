export class chatArea {

    titleOfThePage() {
        cy.get('title').should('contain', 'Conplat')
    }

    chatLayoutPage(){
        var textList = ['Moin', "Wie ghets dir", 'Wie ist das Wetter', 
        'Gibst du mir bitte Weather forcast', 'Welche sprache sprichst du?',
        'Sprichst du mehrere Sprachen?', 'Wie ist Corona situation in Bremen',
        'Wo kann mann besuchen in Bremen', 'Ist morgen regnet']
        cy.wait(4000)
        cy.wrap(textList).each((index) => {

            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
            cy.wait(1500)
        })
    }

    testBackend(){
        cy.server()
        cy.intercept('POST', '**/socket.io/**').as('sessionInitialization')

        var textList = ["Hallo","Wie ghets dir"]
        cy.wait(2000)
        cy.wrap(textList).each((index) => {

            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
        })
        cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {

            cy.wrap(thumbsUP).contains('thumb_up').click()
            //console.log(thumbsUP)
            
        })
        
        cy.get('@sessionInitialization').then( xhr => {
            //console.log(xhr)

            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.response.body).to.equal('OK')
            expect(xhr.response.statusMessage).to.equal('OK')
        })
    }

    testFeedback(){

        var textList = ["Hallo","Wie ghets dir"]
        cy.wait(3000)
        cy.wrap(textList).each((index) => {

            cy.get('[type="text"]').type(index)
            cy.contains('i', 'send').click()
        })
        cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {

            cy.wrap(thumbsUP).contains('thumb_up').click()
            
        })

        cy.get('[data-cy="feedbackRatingGoodBtn"]')
            .invoke('attr', 'style')
                .should('equal', 'color: black !important;')

    }

    testViewport(){

        const sizes = ['iphone-6', 'iphone-4', [1024,768]]
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
            })
            cy.get('[data-cy="feedbackRatingGoodBtn"] i').then( thumbsUP => {
                
                cy.wrap(thumbsUP).contains('thumb_up').click()
                
            })
        })
    }
}

export const onChatAre = new chatArea()