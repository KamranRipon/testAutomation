const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)

export class entity_hinzufuegen {

    entityHinzufuegen() {

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
                
        // checking url after clicking Entity Button
        cy.url().should("eq", "http://localhost/trainingsdaten/entity/");

        // Entity Hinzufuegen testing 
        
        // Clicking Entity Hinzufuegen
        cy.get('[data-cy="entity-create"]')
            .should('be.visible')
            .click()

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/entity/neu/");

        // Check Successfully saved
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.wait(500)
        // Saved Notification Must appear after successfully saved
        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Entity "'+ addValue +'" wurde erfolgreich gespeichert ')
        })
        
        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]').contains('Alle').click()
        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                //const text = $text.text()
                cy.wrap($text).should('have.text', addValue)
            }) 

        // Leave Site with menu or Breadcrump doesn't save value
        // Clicking Entity Hinzufuegen
        cy.get('[data-cy="entity-create"]')
            .should('be.visible')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(m))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(m))

        // Leave Site by Clicking Entities 
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
                .click()
        // Check Value saved or Not
        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]').contains('Alle').click()
        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(m))
            }) 

        // Return to Entity
        //cy.get('[class="v-list-item__content"]').contains('Entity').click()
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
                .click()

        cy.get('[data-cy="entity-create"]')
            .click()

        // Checking for a valid Name
        cy.get('[class="v-input pb-6 v-input--has-state theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined error--text"]')
        .find('[class="v-text-field__details"]')
        .contains('Der Name muss gesetzt sein')
        .should('be.visible')

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
                .click({force:true})
        
        cy.get('[class="v-text-field__details"]')
            .contains('Der Name muss gesetzt sein')
            .should('be.visible')

        // Checking for space or "/" within a Name
        cy.get('[class="v-label v-label--active theme--light error--text"]')
        .should('be.visible')
            .type(' ')

        cy.get('[class="v-text-field__details"]')
            .contains('Der Name enthält ungültige Zeichen!')
            .should('be.visible')
        
        // Checking for Duplicate Name: Name cannot be known in Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                .contains('Das Entity konnte nicht gespeichert werden.')
            
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Das Entity konnte nicht gespeichert werden. ')
                })
        
        //cy.get('[class="v-list-item__content"]').contains('Intents').click()
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
                .click()
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="entity-create"]')
                .click()

            cy.get('[class="v-text-field__slot"]')
            .contains('Name')
                .click({force:true})

            cy.get('[class="v-label v-label--active theme--light error--text"]')
            .should('be.visible')
                .type(index)

            cy.get('[class="v-label theme--light"]')
                .contains('Beschreibung')
                    .click({force:true})
                    
            cy.get('[class="v-label v-label--active theme--light primary--text"]')
                .should('be.visible')
                    .type(index)
                    
            cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                    .should('be.visible')
                        .click()

            cy.get('[class="v-list-item__content"]').contains('Entities').click()

        })
    }
}
// Exportint class frontEnd to End2End to test
export const onEntityHinzufuegen = new entity_hinzufuegen()