const test1     = Math.floor(Math.random() * 10000);
const test2     = Math.floor(Math.random() * 90000);

export class button_suchen {

    buttonSuchen() {
        /* H. Response Button Suchen Testing */
        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
            })        
        //Enter to a row of Response Table which contain highest no. of text
        var max_val2 = 0
        // Enter to Response table Row
        cy.log('Line 35')
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')
                                                                
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                    if(Number(sp_vall2[num2]) > max_val2) {
                        max_val2 = sp_vall2[num2]
                        cy.log(max_val2)
                    }
                }
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })
        // Locate Button Tab and enter to it
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Buttons')
            .click()
            .wait(300)  

        // Anlegen Some Random response-button-title
        const randonVal = ['test'+String(test1), 'test'+String(test2), 'weather']
        cy.wrap(randonVal).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="responsebutton-create"]')
                .click()

            cy.get('[data-cy="responsebutton-title"]')
                .click({force:true})
                .type(index)

            // Add an Intent 
            cy.get('[class="v-select__slot"]')
                .contains('Intent')
                .click({force:true})
                .get('[class="v-list v-select-list v-sheet theme--light theme--light"]')
                .find('[role="option"]')
                .last()
                .click()

            cy.get('[data-cy="create-button"]').eq(0)
                .click()
        })
        cy.wait(500)
        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
                           
        // Single Response
        cy.get('[data-cy="responsebutton-table-search"]')
            .click({force:true})
                .type('weather')

        // Assert Return Result
        cy.log('Line 98')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(2)')
            .should('have.text', 'weather')
        
        // Multiple Response
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type('test')

        cy.get('tbody')
            .find('tr')
            .should('have.length', 2)
            .find('td:nth-child(2)')
            .should('contain','test')

        // Nonexisting Response
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")
        
        const randonValue = ['test', 'weather']
        cy.wrap(randonValue).each((index) => {
            // delete button
            cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type(index)

            cy.get('tbody')
                .find('tr')
                .find('td:nth-child(6)')
                .first()
                .click()

            // Confirm delete
            cy.get('[class="v-btn__content"]')
            .contains('Löschen')
            .click()

            // clear response-table-search
            cy.get('[data-cy="responsebutton-table-search"]')
                .clear()
        })
        // delete rest of the test
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
            .type('test')

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(6)')
            .first()
            .click()

        // Confirm delete
        cy.get('[class="v-btn__content"]')
        .contains('Löschen')
        .click()
        
        // clear response-table-search
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onResponsesButtonSuchen = new button_suchen()