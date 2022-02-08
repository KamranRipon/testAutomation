const m = Math.floor(Math.random() * 1000);

export class intent_example_suchen {
    
    intentExampleSuchen() {
        ///* Intent Example Search Option testing *///

        // Expand Navigation Trainingsdaten
        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()

        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
            .click({force:true})

        cy.get('[class="v-tab"]').contains('Examples').click()

        // select whole table
        cy.get('[class="v-input__append-inner"]').last().click({force:true})
        cy.get('[class="v-list-item__title"]').contains('Alle').click()
        
        // Single example
        cy.get('[class="v-text-field__slot"]')
            .contains('Suchen').click({force:true})
                .type('hello')
        
        // Checking return Result
        cy.get('tbody')//.find('[class="text-start"]').should('contain','hallo')
            .find('td:nth-child(2)').first().then(function($val) {
            cy.log($val.text())
            const text = $val.text()

            cy.wrap($val).should('have.text', text)
            })

        // Multiple Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
                .type('test')

        cy.get('tbody')//.find('[class="text-start"]').should('contain','hallo')
            .find('td:nth-child(2)').first().then(function($val) {
            cy.log($val.text())
            const text = $val.text()

            cy.wrap($val).should('have.text', text)
        })

        // Non-existing Intent
        cy.get('[class="v-text-field__slot"]')
            .clear().type('sky')
                
        cy.get('tbody').find('[class="v-data-table__empty-wrapper"]')
            .should('contain',"")

        cy.get('[class="v-text-field__slot"]')
            .clear() 

        // Check Example count same in Intent Table
        cy.get('tbody')
        .find('td:nth-child(2)')
            .then(function($countTR) {
                cy.log($countTR.length)
                let nRow = $countTR.length

        // Back to Intent Table
        cy.get('[data-cy="navDrawerIntents"]')
            .contains('Intents')
                .click()
        
        // Select first row of the Intent table
        //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
        cy.get('tbody')
            .find('td:nth-child(3)')
            .first().then(function($intentExCount) {
                cy.wrap($intentExCount).should('have.text', ' '+nRow+' ')
            })
        })
    }
    
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleSuchen = new intent_example_suchen()