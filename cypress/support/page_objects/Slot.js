import { capitalize, find, first, values } from "lodash"


const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class slots {

    slotHinzufuegen() {

        /* Entity Hinzufuegen Testing */
        
        // Enter Trainingsdaten
        if (cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')) {

            cy.log('If Statement True')

            cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()

            cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
        }
        else {
            cy.log('If Statement False')
            cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
        }
        
        // Entering Slot tab
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        cy.wait(500)

        // checking url after clicking Slot Button
        cy.url().should("eq", "http://localhost/trainingsdaten/slot/");
        
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]')
            .should('be.visible')
            .click()

        //intentional errror
        cy.get('[data-cy="navDrawerSlot"]')
        
        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/slot/neu/");

        /*
        1. Check for notification for invalid message
            > name should not be empty
            > name should not contain space
        2. Check for duplicate name
            > Same name cannot save again
        3. Check for succefully saved or not
        */

        /* Check Successfully saved */

        //Slot Type: TEXT
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)
        
        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})
        
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Initialer Wert')
            .click({force:true})
            .type('example Text')

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()
        
        //  Der Slot "ffff" wurde erfolgreich gespeichert 
        cy.wait(500)
        // Saved Notification Must appear after successfully saved
        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Der Slot "'+ addValue +'" wurde erfolgreich gespeichert ')
        })
        
        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]').contains('Alle').click()
        cy.wait(200)
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
        cy.get('[data-cy="slot-create"]')
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
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
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
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        cy.get('[data-cy="slot-create"]')
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

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})
        
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Initialer Wert')
            .click({force:true})
            .type('example Text')

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()
        cy.wait(500)

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                //.contains(' Der Slot konnte nicht gespeichert werden. ')
                //Der Slot konnte nicht gespeichert werden. 
            
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Der Slot konnte nicht gespeichert werden. ')
                })
        
        //cy.get('[class="v-list-item__content"]').contains('Intents').click()
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="slot-create"]')
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

            cy.get('[class="v-list-item__content"]').contains('Slots').click()
        })
    }
}
// Exportint class frontEnd to End2End to test
export const onSlot = new slots()