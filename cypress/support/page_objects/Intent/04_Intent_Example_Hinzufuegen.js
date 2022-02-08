const exm = Math.floor(Math.random() * 2500)
const addExample = 'testExample'

export class intent_example_hinzufuegen {
    
    intentExampleHinzufuegen() {

        //  Expand Navigation Trainingsdaten
        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {

                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                }
        })
        // 1. Test Intent-Example-Hinzufuegen Text field
        // 1.1 Text must not be empty -- // Currently Bug //
        // Entering Intent Tab
        cy.get('[data-cy=navDrawerIntents]')
            .click()
            
        // Entering to first row of the Intent Table
        cy.log('Line 499')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Entering to Example Tab
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()
        //cy.get('[class="v-tab"]').contains('Examples').click()

        // Clicking Example Hizufuegen Button
        cy.get('[data-cy="create-intent-example"]')
            .click()

        // Assert initial warning Message 
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        // Anlegen  & weiteres Example 
        cy.get('[data-cy="example-text"]')
            .click({force:true})
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
            .wait(500)

        cy.get('[data-cy="success-remove"]')
            .click()
        
        // Add an example 
        cy.get('[data-cy="example-text"]')
            .click({force:true})
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
            .wait(500)

        // Assert Successfully Saved Notification
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        var idNr
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Example'+String(idNr)+'wurde erfolgreich gespeichert ')
            })
                   
        // Assert in Intent-Example Table
        cy.log('Line 561')
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {

                const text = $text.text()
                cy.wrap($text).should('have.text', addExample+String(exm))
            }) 

        // 1.2 Leave site via menu or breadcrump is possible
        // doesn't save given data
        cy.get('[data-cy="create-intent-example"]')
                .click()

        // Add an example 
        cy.get('[data-cy="example-text"]')
            .click({force:true})
            .type('breadcrump')
    
        cy.get('[class="v-breadcrumbs theme--light"]')
            .contains(' Examples ')
            .click({force:true})

        // Assert Successfully Saved Notification
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('td:nth-child(2)')
            .should('not.have.text', 'breadcrump')

        // 1.3 Saving saves given data correctly
        // Back to Intent
        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
                .click()

        // Assert Successfully Saved Notification
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
        var inName
        cy.log('Line 607')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')

            .then(($testFunc) => {
                const vall = $testFunc.text()

                var sp_vall = vall.split(" ")
                
                var max_val = 0
                var num
                for (num=0; num < sp_vall.length; num++){
                    
                    if(sp_vall[num] > max_val) {
                        max_val = sp_vall[num]
                    }
                }
                // Enter To Intent Row contain more than one Rules
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(3)')
                    .contains(max_val)
                    .click()

                // Save Intent Name for letar Assertion
                cy.get('[class="v-text-field__slot"]').eq(0)
                    .find('[data-cy="intent-name"]')
                        .invoke('val').as('name')
                    
                cy.get('@name').then((name1) => {

                    cy.log(name1) //prints name

                    inName = name1
                    cy.log(inName)
                })

        // Entering to Example Tab
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()
            .wait(500)

        // Assert Successfully Saved Notification
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
                
        // 6. Number of Rules must show correctly in Intent Table
        cy.log('Line 650')
        cy.get('tbody')
            .find('tr')
            .then(function($countTr2) {
                const NoOfExm =$countTr2.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})
                cy.log(inName)
                cy.get('[data-cy="intent-table-search"]')
                    .click()
                    .type(inName)

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .find('td:nth-child(3)')
                    .should('have.text', ' '+String(NoOfExm)+' ')
            })
            
        })

        // Back to Intent
        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()

        // Select first row of the Intent table
        //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
        cy.get('tbody')
            .first()
            .click({force:true})

         // Entering to Example Tab
         cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // add more Intent-Examples to test intent-example Search  
        var exmList = ["Example1", "Example2","Hello", "Bye"]
        cy.wrap(exmList).each((index) => {

            cy.get('[data-cy="create-intent-example"]')
                .click()

            // Add an example 
            cy.get('[data-cy="example-text"]')
                .click({force:true})
                .type(index)
        
            cy.get('[data-cy="create-button"]').eq(0)
                .click()
        })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleHinzufuegen = new intent_example_hinzufuegen()