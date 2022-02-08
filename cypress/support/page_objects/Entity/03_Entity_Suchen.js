const m = Math.floor(Math.random() * 1000);

export class entity_suchen {

    entitySuchen() {
        ///* Search Option testing *///

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerEntities"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerEntities"]')
                        .click()
                }
            })
        // checking url after clicking Inten Button
        cy.url().should("eq", "http://localhost/trainingsdaten/entity/");

        // Single Intent
        cy.get('[class="v-text-field__slot"]')
            .contains('Suchen').click({force:true})
                .type('weather')
        // Checking return Result
        cy.get('tbody').find('[class="text-start"]').should('contain','weather')
        //cy.wait(500)
        // Multiple Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
                .type('test')
        
        cy.get('tbody').find('[class="text-start"]').should('contain','test')

        // Nonexisting Intent
        cy.get('[class="v-text-field__slot"]')
            .clear().type('sky')
                
        cy.get('tbody').find('[class="v-data-table__empty-wrapper"]')
            .should('contain',"")

        cy.get('[class="v-text-field__slot"]')
            .clear() 
    }
}
// Exportint class frontEnd to End2End to test
export const onEntitySuchen = new entity_suchen()