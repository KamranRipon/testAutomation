
export class intent_example_loeschen {
    
    intentExampleLoeschen() {

        // Expand Navigation Trainingsdaten
        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // Clicking Intent
        cy.get('[data-cy="navDrawerIntents"]')
            .contains('Intents')
                .click()
                .wait(400) 
        
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})

        cy.get('[class="v-tab"]')
            .contains('Examples')
            .click()
            .wait(500)

        cy.get('[class="v-select__slot"]')
            .click()
            .get('[class="v-list-item__content"]')
                .contains('Alle').click({force:true})

        cy.log('Line 656')
        
        cy.get('tbody tr').then(function($noRow) {
            const tableRow = $noRow.length
            cy.log(tableRow)

            if (tableRow <= 1 ) {
                cy.log('Running if')
                var exmList = ["Example1","Example2", "Example3"]

                cy.wrap(exmList).each((index) => {

                cy.get('[data-cy="createIntentExampleButton"]').click()

                cy.get('[class="v-text-field__slot"]').contains('Text')
                    .click({force: true}).type(index)
                
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click()
                    .wait(200)

                })

                cy.get('[class="deleteIcon v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
                    .first()
                    .click()
                    .wait(500)

                // Confirm Delete
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
            }
            else {
                cy.log('Running es')
                cy.get('[class="deleteIcon v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
                    .first()
                    .click({force:true})
                    .wait(500)

                // Confirm Delete
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
                    .wait(500)
            }

            cy.log(tableRow)
        })

        cy.log('Line 696')
        cy.get('tbody tr').then(function($noRowCount) {
            const tableRowCount = $noRowCount.length
            cy.log(tableRowCount)

            // Clicking Intent
            cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
                .wait(500)
            
            // Select first row of the Intent table
            //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            cy.get('tbody')
            .find('td:nth-child(3)')
            .first().then(function($intentExCount2) {
                cy.wrap($intentExCount2).should('have.text', ' '+tableRowCount+' ')

            })
        })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleLoeschen = new intent_example_loeschen()