export class response_suchen {

    responseSuchen() {
        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {

                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                        .wait(500)
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                        .wait(500)
                }
        }) 

        // Anlegen Some Random Value to Response
        const randonVal = ['response1', 'response2', 'weather']
        cy.wrap(randonVal).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="response-create"]')
                .click()

            cy.get('[data-cy="response-name"]')
                .click({force:true})
                .type(index)

            cy.get('[data-cy="create-button"]')
                .click()
            
            // Back to Response Tab
            cy.get('[data-cy="navDrawerResponses"]')
                .click()
        })
        
        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
                           
        // Single Response
        cy.get('[data-cy="response-table-search"]')
            .click({force:true})
                .type('weather')

        // Assert Return Result
        cy.log('Line 1172')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', 'weather')
        
        // Multiple Response
        cy.get('[data-cy="response-table-search"]')
            .clear()
            .type('response')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 2)
            .find('td:nth-child(1)')
            .should('contain','response')

        // Nonexisting Response
        cy.get('[data-cy="response-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="response-table-search"]')
            .clear() 
    }
}
// 
export const onResponseSuchen = new response_suchen()