import { capitalize, find, first, values } from "lodash"

const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class entity {

    // entityHinzufuegen() {

    //     // cy.get('.v-text-field__slot')
    //     //     .contains('Suchen')
    //     //         .click({force:true})
    //     //             .type('test')

    //     /* Entities testing */
        
    //     cy.get('[class="v-list-item__title pl-4"]')
    //         .contains('Trainingsdaten')
    //         .click()

    //     // Entering Entity tab
    //     cy.get('[data-cy="navDrawerEntities"]')
    //         .contains('Entities')
    //             .click()
        
    //     // checking url after clicking Entity Button
    //     cy.url().should("eq", "http://localhost/trainingsdaten/entity/");

    //     // Entity Hinzufuegen testing 
        
    //     // Clicking Entity Hinzufuegen
    //     cy.get('[data-cy="entity-create"]')
    //         .should('be.visible')
    //         .click()

    //     // checking url after clicking Intent Hinzufuegen
    //     cy.url().should("eq", "http://localhost/trainingsdaten/entity/neu/");

    //     // Check Successfully saved
        
    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Name')
    //         .click({force:true})
    //         .type(addValue)

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Beschreibung')
    //         .click({force:true})
    //         .type(addValue)

    //     cy.get('[class="v-btn__content"]')
    //     .contains('Anlegen')
    //         .should('be.visible')
    //             .click()

    //     cy.wait(500)
    //     // Saved Notification Must appear after successfully saved
    //     cy.get('[class="row align-center no-gutters"]')
    //         .find('[data-cy="successMessageTitle"]')
    //         .then((successMsg) => {
    //             expect(successMsg).to.have.text(' Das Entity "'+ addValue +'" wurde erfolgreich gespeichert ')
    //     })
        
    //     // Select Whole Table
    //     cy.get('[class="v-select__slot"]').click()
    //     cy.get('[class="v-list-item__content"]').contains('Alle').click()
    //     // Check saved example saved or Not
    //     cy.get('tbody')
    //         .find('tr')
    //             .last()
    //         .find('td:nth-child(1)').then(function($text) {
    //             cy.log($text.text())
    //             //const text = $text.text()
    //             cy.wrap($text).should('have.text', addValue)
    //         }) 

    //     // Leave Site with menu or Breadcrump doesn't save value
    //     // Clicking Entity Hinzufuegen
    //     cy.get('[data-cy="entity-create"]')
    //         .should('be.visible')
    //         .click()

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Name')
    //         .click({force:true})
    //         .type(addValue+String(m))

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Beschreibung')
    //         .click({force:true})
    //         .type(addValue+String(m))

    //     // Leave Site by Clicking Entities 
    //     cy.get('[data-cy="navDrawerEntities"]')
    //         .contains('Entities')
    //             .click()
    //     // Check Value saved or Not
    //     // Select Whole Table
    //     cy.get('[class="v-select__slot"]').click()
    //     cy.get('[class="v-list-item__content"]').contains('Alle').click()
    //     // Check saved example saved or Not
    //     cy.get('tbody')
    //         .find('tr')
    //             .last()
    //         .find('td:nth-child(1)').then(function($text) {
    //             cy.log($text.text())
    //             cy.wrap($text).should('not.have.text', addValue+String(m))
    //         }) 

    //     // Return to Entity
    //     //cy.get('[class="v-list-item__content"]').contains('Entity').click()
    //     cy.get('[data-cy="navDrawerEntities"]')
    //         .contains('Entities')
    //             .click()

    //     cy.get('[data-cy="entity-create"]')
    //         .click()

    //     // Checking for a valid Name
    //     cy.get('[class="v-input pb-6 v-input--has-state theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined error--text"]')
    //     .find('[class="v-text-field__details"]')
    //     .contains('Der Name muss gesetzt sein')
    //     .should('be.visible')

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Name')
    //             .click({force:true})
        
    //     cy.get('[class="v-text-field__details"]')
    //         .contains('Der Name muss gesetzt sein')
    //         .should('be.visible')

    //     // Checking for space or "/" within a Name
    //     cy.get('[class="v-label v-label--active theme--light error--text"]')
    //     .should('be.visible')
    //         .type(' ')

    //     cy.get('[class="v-text-field__details"]')
    //         .contains('Der Name enthält ungültige Zeichen!')
    //         .should('be.visible')
        
    //     // Checking for Duplicate Name: Name cannot be known in Intent
    //     cy.get('[class="v-text-field__slot"]')
    //         .clear()

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Name')
    //         .click({force:true})
    //         .type(addValue)

    //     cy.get('[class="v-text-field__slot"]')
    //         .contains('Beschreibung')
    //         .click({force:true})
    //         .type(addValue)

    //     cy.get('[class="v-btn__content"]')
    //     .contains('Anlegen')
    //         .should('be.visible')
    //             .click()

    //     cy.get('[class="alert error white--text"]')
    //         .find('[data-cy="errorMessageTitle"]')
    //             .contains('Das Entity konnte nicht gespeichert werden.')
            
    //             .then((errorMsg) => {
    //                 expect(errorMsg).to.have.text(' Das Entity konnte nicht gespeichert werden. ')
    //             })
        
    //     //cy.get('[class="v-list-item__content"]').contains('Intents').click()
    //     cy.get('[data-cy="navDrawerEntities"]')
    //         .contains('Entities')
    //             .click()
        
    //     // After Click Input field must be activated
    //     var textList = ["test15","test1", "weather"]
    //     cy.wrap(textList).each((index) => {

    //         cy.get('[data-cy="entity-create"]')
    //             .click()

    //         cy.get('[class="v-text-field__slot"]')
    //         .contains('Name')
    //             .click({force:true})

    //         cy.get('[class="v-label v-label--active theme--light error--text"]')
    //         .should('be.visible')
    //             .type(index)

    //         cy.get('[class="v-label theme--light"]')
    //             .contains('Beschreibung')
    //                 .click({force:true})
                    
    //         cy.get('[class="v-label v-label--active theme--light primary--text"]')
    //             .should('be.visible')
    //                 .type(index)
                    
    //         cy.get('[class="v-btn__content"]')
    //             .contains('Anlegen')
    //                 .should('be.visible')
    //                     .click()

    //         cy.get('[class="v-list-item__content"]').contains('Entities').click()

    //     })
    // }

    entityBearbeiten() {
        
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten').then((body) => {

            if (body.get('[class="v-list-group v-list-group--active primary--text"]')) {
                cy.log('If Statement True')
                // Clicking Intent
                cy.get('[data-cy="navDrawerEntities"]')
                    .contains('Entities')
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[tabindex="0"]')
                    .contains('Trainingsdaten')
                    .click()

                 // Clicking Intent
                cy.get('[data-cy="navDrawerEntities"]')
                    .contains('Entities')
                    .click()
            }
        })
        // Testing Intents Bearbeitung
       
        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        // Checking for a valid Name
        cy.get('div.v-input:nth-child(1)')
            .find('[class="v-text-field__details"]')
            .contains('Der Name muss gesetzt sein')
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text('Der Name muss gesetzt sein')
        })
        cy.get('[class="v-text-field__slot"]').clear()
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .first()
                .click({force:true}).type(' ')

        // Checking for space or "/" within a Name
        cy.get('[class="v-text-field__details"]')
            .contains('Der Name enthält ungültige Zeichen!')
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text('Der Name enthält ungültige Zeichen!')
            })       

        // Check for value Saved or Not
        cy.get('[class="v-text-field__slot"]')
            .clear()
            .contains('Name')
            .click({force:true})
            .type('test161')

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type('test161')
        
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})

        //cy.visit('http://localhost/trainingsdaten/entity/')

        cy.get('tbody')
            .find('tr')
                .first()
            .find('td:nth-child(1)').then(function($val) {
                cy.log($val.text())
                const text = $val.text()

                cy.wrap($val).should('have.text', 'test161')
                })

        /* Check for successfully saved notification */
        // Select first row of the Intent table 
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        cy.get('[class="v-text-field__slot"]')
        .contains('Name')
        .click({force:true})
        .wait(200)
        .type(addValue+String(m))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(m))

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
        cy.log('Im here')
        // Saved Notification Must appear after successfully saved
        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Entity "test161" wurde erfolgreich gespeichert ')
        })
        /* Check for  known or duplicate value in the table */
        // Select first row of the Intent table 
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.log('Clear')
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        // cy.get('[class="v-text-field__slot"]')
        // .contains('Name')
        // .click({force:true})
        // .type('test1')

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Beschreibung')
        //     .click({force:true})
        //     .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .clear()
            .contains('Name')
            .click({force:true})
            .type('test1')

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type('test1')

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
        cy.wait(500)
        // Saved Notification Must appear after successfully saved
        if (cy.get('[class="alert error white--text"]')) {
            cy.log('If Statement True')
            cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageBody"]')
            .then((errorMsg) => {
                expect(errorMsg).to.have.text(' Es exisitiert bereits ein Entity mit diesem Namen ')
        })
        }
        else {
            cy.log('If Statement False')
        }
        
        cy.wait(1500)
        cy.get('[class="v-input__append-inner"]')
        .first()
        .click()
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type('test-infi')

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
    }

    entitySuchen() {
        ///* Search Option testing *///

        // Expand Navigation Trainingsdaten
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()

        // Intents area testing
        // Clicking Intent
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
                .click()

        //cy.wait(1000)
        
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
export const onEntity = new entity()