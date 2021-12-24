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

        // checking url after clicking Slot Button
        cy.url().should("eq", "http://localhost/trainingsdaten/slot/");
        
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]')
            .should('have.attr', 'href')
            .then(($href) => {
                   cy.visit($href)
                        })

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/slot/neu/");

        /*
        1. Check for notification for invalid Name
            1.1 Name should not be empty
            1.2 name should not contain space or forward Slash (/)
        2. Check for succefully saved or not
            2.1 Notification -- Done
            2.2 check table  -- Done
        3. Check for duplicate name
            3.1 Existing name cannot save double
        */

        /* Check Successfully saved */

        //1. Slot Type: TEXT
        //2. Slot Type: Float
        //3. Slot Type: Bool
        //4. Slot Type: List
        //5. Slot Type: Categorical
        //6. Slot Type: Any
        
        /* Solt Hinzufuegen Start */
        // 2.1 Testing Notification Message
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
        // 1. Selecting Text
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Initialer Wert')
            .click({force:true})
            // Typing Text
            .type('example Text')
        // Click Anlegen
        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()
        
        // Assert Notification Message
        //  Der Slot "ffff" wurde erfolgreich gespeichert 
        cy.wait(500)
        // Saved Notification Must appear after successfully saved
        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Der Slot "'+ addValue +'" wurde erfolgreich gespeichert ')
        })
        
        // 2.2 Testing saved value in Slot Table
        // Selecting Whole Table
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
        
        // Check Saved value end here

        // Leave Site with menu or Breadcrump doesn't save value
        // Clicking Slot Hinzufuegen
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

        // Leave Site by Clicking Slot  
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Check Value saved or Not
        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle').click()

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(m))
            }) 
        
        /* Chicking for valid Name 
        1.1 Name should not be empty
        */
        // Clicking Slot hinzufugen

        cy.get('[data-cy="slot-create"]')
            .click()

        // Checking for a valid Name Notifications
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
        
        /* 1.2 name should not contain space or forward Slash (/)
        Checking for space or "/" within a Name
        */

        cy.get('[class="v-label v-label--active theme--light error--text"]')
        .should('be.visible')
            .type(' ')

        cy.get('[class="v-text-field__details"]')
            .contains('Der Name enthält ungültige Zeichen!')
            .should('be.visible')
        
        /* 
        Checking for Duplicate Name: Name cannot be known in Intent
        3.1 Existing name cannot save double
        */
        
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

        // Checking Radio Button
        cy.get('[data-cy="slot-influence-conversation"]')
            .find('[value=false]')
            .click({force:true})

        cy.get('[data-cy="slot-influence-conversation"]')
            .find('[value=false]')
            .should('be.checked')

        cy.get('[data-cy="slot-influence-conversation"]')
            .find('[value=true]')
            .click({force:true})

        cy.get('[data-cy="slot-influence-conversation"]')
            .find('[value=true]')
            .should('be.checked')

        cy.get('[data-cy="slot-autofill"]')
        .find('[value=false]')
            .click({force:true})
        
        cy.get('[data-cy="slot-autofill"]')
            .find('[value=false]')
            .should('be.checked')

        cy.get('[data-cy="slot-autofill"]')
        .find('[value=true]').last()
            .click({force:true})

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