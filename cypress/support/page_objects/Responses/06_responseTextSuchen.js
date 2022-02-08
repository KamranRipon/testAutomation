const t     = Math.floor(Math.random() * 5000);
const b     = Math.floor(Math.random() * 1000);
const addValue = 'resTxSuchDmy'

export class responses_text_suchen {

    responseTexteSuchen() {

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
        
        // Entering to first of
        cy.log('Line 1143')
        cy.wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
        
        var max_val2 = 0
        // Enter to Response table Row
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                var sp_vall2 = vall2.split(" ")
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){
                    
                    if(sp_vall2[num2] > max_val2) {
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

        // Entering to Texte Tab
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Texte')
            .click()
            .wait(500)
                
        // Anlegen Some Random Value to Response
        cy.log('Line 1185')
        const randonValue = [t, t, b]
        cy.wrap(randonValue).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="responsetext-create"]')
                .click()

            cy.get('[data-cy="responsetext-text"]')
                .click({force:true})
                .type(index)

            cy.get('[data-cy="create-button"]')
                .click()
        })
        
        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
                        
        // Single Response
        cy.get('[data-cy="responsetext-table-search"]')
            .click({force:true})
                .type(b)

        // Assert Return Result
        cy.log('Line 1212')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(2)')
            .should('have.text', b)
        
        // Multiple Response
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()
            .type(t)
        cy.get('tbody')
            .find('tr')
            .should('have.length', 2)  // hard coding is not good idea
            .find('td:nth-child(2)')
            .should('contain', t)

        // Nonexisting Response
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="responsetext-table-search"]')
            .clear() 
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesTextSuchen = new responses_text_suchen()