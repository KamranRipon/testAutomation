import { capitalize, find, first, values } from "lodash"

const t = Math.floor(Math.random() * 3000);
const f = Math.floor(Math.random() * 3500);
const b = Math.floor(Math.random() * 4000);
const l = Math.floor(Math.random() * 4500);
const c = Math.floor(Math.random() * 5000);
const a = Math.floor(Math.random() * 5500);
const tx = Math.floor(Math.random() * 5500);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class slots {

    slotHinzufuegen() {

        /* Slot Hinzufuegen Testing */
        
        // Entering to Trainingsdaten
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

        // Assert URL after clicking Slot
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
        2. Check for successfully saved or not
            2.1 Notification
                2.1.1 Text
                -- Float
            2.2 check table
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
        
        // 2.1 Testing saved Notification Message

        const sortTyp   = ['Text', 'Float', 'Bool', 'List', 'Categorical','Any']
        
        cy.wrap(sortTyp).each((index) => {

            if  (index == 'Text') {
                
                cy.log(' -- Text -- ')

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Text')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(t))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .type(addValue+String(t))
                
                
                cy.get('[data-cy="slot-text-initialvalue"]')
                    .click({force:true})
                    // Typing Text
                    .type('example Text'+String(t))

                // Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')


                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=true]').last()
                    .click({force:true})
                    .should('be.checked')

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
                        expect(successMsg).to.have.text(' Der Slot "'+ addValue+String(t) +'" wurde erfolgreich gespeichert ')
                })

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type('Text')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Line 171')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(t))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','initial: „example Text'+String(t)+'“')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Float') {
                cy.log(index)

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Float')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                // cy.get('[data-cy="slot-create"]')
                //     .click()
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting Floot
                // cy.get('[class="v-list-item__content"]')
                //     .contains('Float')
                //     .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(f))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .type(addValue+String(f))
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting Floot
                // cy.get('[class="v-list-item__content"]')
                //     .contains('Float')
                //     .click({force:true})

                /* Checking correctness of error Message */
                // for non-numeric there should be a warning message

                //Minimum
                cy.get('[data-cy="slot-float-minvalue"]')
                    .clear()
                    .type('notNumeric')
                    .wait(500)
                cy.get('[class="v-messages__wrapper"]')
                    .should('have.text','Der minimale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                
                cy.get('[data-cy="slot-float-minvalue"]')
                    .click({force:true})
                    .clear()
                    .wait(500)
                    .type(-1)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('not.have.text','Der minimale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                    .get('[data-cy="slot-float-minvalue"]')
                    .click({force:true})
                    .clear()
                    .type(0)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('not.have.text', 'Der minimale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                
                //Maximale
                cy.get('[data-cy="slot-float-maxvalue"]')
                    .clear()
                    .type('notNumeric')
    
                cy.get('[class="v-messages__wrapper"]')
                    .should('have.text','Der maximale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                
                cy.get('[data-cy="slot-float-maxvalue"]')
                    .click({force:true})
                    .clear()
                    .wait(500)
                    .type(0)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('not.have.text', 'Der maximale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                    .get('[data-cy="slot-float-maxvalue"]')
                    .click({force:true})
                    .clear()
                    .type(1)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('not.have.text', 'Der maximale Wert eines Slots des Typs „Float” muss nummerisch sein!')
                    .get('[data-cy="slot-float-minvalue"]')
                    .click({force:true})
                    .clear()
                    .type(1)
                
                cy.get('[data-cy="slot-float-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type(5)
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der initiale Wert eines Slots des Typs „Float” muss zwischen minimalem und maximalem Wert liegen')
                    .get('[data-cy="slot-float-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type(1)
                
                // Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                    .should('be.visible')
                        .click()
                
                cy.wait(500)
                
                // Assert Notification Message
                //  Der Slot "ffff" wurde erfolgreich gespeichert 
                // Saved Notification Must appear after successfully saved
                cy.get('[class="row align-center no-gutters"]')
                    .find('[data-cy="successMessageTitle"]')
                    .then((successMsg) => {
                        expect(successMsg).to.have.text(' Der Slot "'+ addValue+String(f) +'" wurde erfolgreich gespeichert ')
                })

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type('Float')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                cy.log('Line 359')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(f))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','min: 1 max: 1 | initial: 1')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Bool') {

                cy.log(' -- Bool -- ')

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Bool')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                
                // cy.get('[data-cy="slot-create"]')
                //     .click()

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(b))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type('addValue type')
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting Bool
                // cy.get('[class="v-list-item__content"]')
                //     .contains('Bool')
                //     .click({force:true})
                
                cy.get('[data-cy="slot-bool-initialvalue"]')
                    .find('[value="false"]')
                    .click({force:true})

                cy.get('[data-cy="slot-bool-initialvalue"]')
                    .find('[value="true"]')
                    .click({force:true})

                cy.wait(500)
                
                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
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

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    //.should('be.visible')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(300)
                // Check saved example saved or Not
                cy.get('tbody')
                    .find('tr')
                        //.contains('Bool')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        //const text = $text.text()
                        cy.wrap($text).should('have.text', addValue+String(b))
                    })

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type('Bool')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Assert Bool')
                cy.log('Line 493')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(b))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','initial: Wahr')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'List') {

                cy.log(' -- List -- ')

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting List
                cy.get('[class="v-list-item__content"]')
                    .contains('List')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                
                // cy.get('[data-cy="slot-create"]')
                //     .click()

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(l))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(l))
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting List
                // cy.get('[class="v-list-item__content"]')
                //     .contains('List')
                //     .click({force:true})
                
                cy.get('[data-cy="slot-list-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type('initialWert'+String(l))

                //Checking Radio Button
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

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(300)
                // Check saved value saved or Not
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(l))
                    }) 
                
                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type('List')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Assert List')
                cy.log('Line 655')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(l))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','initial: „initialWert'+String(l)+'“')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Categorical') {

                cy.log(' -- Categorical -- ')

                // Slot Hinzufuegen
                cy.get('[data-cy="slot-create"]')
                    .click()

                // Slot-Typ
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 5. Selecting Categorical
                cy.get('[class="v-list-item__content"]')
                    .contains('Categorical')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                cy.log('c '+ String(c))
                
                // Let's save with a valid Name

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(c)) // "c" stand for Category

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(c))
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting Categorical
                // cy.get('[class="v-list-item__content"]')
                //     .contains('Categorical')
                //     .click({force:true})
                
                // Add Categorical
                cy.get('[data-cy="slot-categorical-new"]')
                    .click({force:true})
                    .clear()
                    .type('Category'+String(l))

                cy.get('[class="v-input__append-outer"]')
                    .last()
                    .click()
                
                cy.get('[data-cy="slot-categorical-new"]')
                    .click({force:true})
                    .clear()
                    .type('Category'+String(b))

                cy.get('[class="v-input__append-outer"]')
                    .last()
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Initiale Kategorie')
                    .click({force:true})
                
                cy.get('[class="v-list-item v-list-item--link theme--light"]')
                    .last()
                    .click({force:true})

                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved Sort valud

                cy.wait(500)

                // Assert Saved value, Case: Categorical
                cy.get('[data-cy="slot-table-search"]')
                    .type('Categorical')

                // Select Entire Sort Table
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                // Check saved value, saved or Not
                // Name
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(c))
                    })

                //cy.log('Assert Categorical')

                // // Assert Saved value, Case: Categorical
                // cy.get('[data-cy="slot-table-search"]')
                //     .type('Categorical')
                cy.log('Line 790')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(c))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text', 'Category'+String(l)+', Category'+String(b)+' | initial: Category'+String(b)+'')
                
                // Clear Search field
                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Any') {

                // Start From Here

                cy.log(' -- Any -- ')

                // Slot Hinzufuegen
                cy.get('[data-cy="slot-create"]')
                    .click()

                // Slot-Typ
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[class="v-list-item__content"]')
                    .contains('Any')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                // Let's save with a valid Name

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))
                
                // Add Categorical
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[class="v-list-item__content"]')
                    .contains('Any')
                    .click({force:true})
                
                cy.get('[data-cy="slot-any-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))

                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(500)
                // Check saved value saved or Not
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(a))
                    })

                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type('Any')
                
                cy.log('Assert Any')
                cy.log('Line 924')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(a))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text', 'initial: '+'„'+addValue+String(a)+'“')
                    
                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }
        })
        
        // 2.2 Testing saved value in Slot Table
        // Selecting Whole Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle').click({force:true})

        cy.get('[data-cy="slot-table-search"]')
            .type('Any')

        cy.log('Any')

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                //const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(a))
            }) 

        // Leave Site with menu or Breadcrump without Anlage which doesn't save value
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]')
            //.should('be.visible')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(l))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(l))
        
        // Slot-Typ
        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 1. Selecting Text
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})

        // Leave Site by Clicking Slot  
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Check Value saved or Not
        // Select Whole Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.get('[data-cy="slot-table-search"]')
            .type('Text')

        cy.log('Line 1003')

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(l))
            })
        
        // /* Chicking for Invalid Name Notification
        // 1.1 Name should not be empty Notification
        // */
        // // Slot hinzufugen
        // //cy.wait(500)
        // cy.get('[data-cy="slot-create"]')
        //     .click()

        // // Checking for a valid Name Notifications
        // cy.get('[class="v-input pb-6 v-input--has-state theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined error--text"]')
        //     .find('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')
        
        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Name')
        //         .click({force:true})
        
        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')
        
        /* 1.2 name should not contain space or forward Slash (/)
        Checking for space or "/" within a Name
        */

        // cy.get('[class="v-label v-label--active theme--light error--text"]')
        // .should('be.visible')
        //     .type(' ')

        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name enthält ungültige Zeichen!')
        //     .should('be.visible')
        
        /* 
        Checking for Duplicate Name: Name cannot be known in Intent
        3.1 Existing name cannot save double
        */
        
        cy.get('[class="v-text-field__slot"]')
            .clear()

        // Slot hinzufugen

        cy.get('[data-cy="slot-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(l))

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
        
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
        
        //add Names for test search field
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="slot-create"]')
                .click()

            cy.get('[data-cy="slot-name"]')
                .click({force:true})
                .type(index+String(t*l))
                
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Text')
                    .click({force:true})
                
                cy.get('[data-cy="slot-text-initialvalue"]')
                    .click({force:true})
                    // Typing Text
                    .type('example Text')
                    
            cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                        .click()
        })
    }

    slotBearbeiten() {

        /* Slot Bearbeiten */

        // Entering to Trainingsdaten
        cy.get('[class="v-list-group"]').contains('Trainingsdaten').then((Tdaten) => {

            if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                cy.log('If Statement True')

                cy.get('[data-cy="navDrawerSlots"]')
                    .contains('Slots')
                    .click()
            }
            else {
                cy.log('If Statement False')

                cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                    .contains('Trainingsdaten')
                    .click()

                cy.get('[data-cy="navDrawerSlots"]')
                    .contains('Slots')
                    .click()
            }
        })
        // if (cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')) {

        //     cy.log('If Statement True')

        //     cy.get('[class="v-list-item__title pl-4"]')
        //     .contains('Trainingsdaten')
        //     .click()

        //     cy.get('[data-cy="navDrawerSlots"]')
        //     .contains('Slots')
        //         .click()
        // }
        // else {
        //     cy.log('If Statement False')
        //     cy.get('[data-cy="navDrawerSlots"]')
        //     .contains('Slots')
        //         .click()
        // }

        // Add Slot hinzufuegen for Typ: Text
        cy.get('[data-cy="slot-create"]')
            .click()

        cy.get('[data-cy="slot-name"]')
            .click()
            .type(addValue+String(tx))

        cy.get('[data-cy="slot-description"]')
            .click()
            .type(addValue)

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click()

        cy.get('[data-cy="slot-text-initialvalue"]')
            .click()
            .type('addInitialvalue')

        cy.get('[data-cy="create-button"]')
            .click()

        // Enter First row of the Slot Table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[class="v-input__append-inner"]')
            .first()
            .click()
        
        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')

        // Click save button
        cy.get('[data-cy="save-button"]')   
            .click()

        // Assert Error Message Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Slot konnte nicht gespeichert werden. ')
        
        /* 1.2 name should not contain space or forward Slash (/)
        Checking for space or "/" within a Name
        */    
        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(' ') // t for Text
            .get('[class="v-messages__wrapper"]')
            .should('have.text', 'Der Name enthält ungültige Zeichen!')
            .get('[data-cy="slot-name"]')
            .click({force:true})

        // Click save button
        cy.get('[data-cy="save-button"]')   
            .click()    

        // Assert Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Slot konnte nicht gespeichert werden. ')
        
        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Name')
        //         .click({force:true})
        
        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')
        
        // /* 1.2 name should not contain space or forward Slash (/)
        // Checking for space or "/" within a Name
        // */

        // cy.get('[class="v-label v-label--active theme--light error--text"]')
        // .should('be.visible')
        //     .type(' ')

        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name enthält ungültige Zeichen!')
        //     .should('be.visible')

        /* 
        Checking for Duplicate Name: Name cannot be known in Slot
        3.1 Existing name cannot save double
        */
        cy.log('Checking for Duplicate Name')
        cy.log('Line 1276')
        
        cy.get('[data-cy="slot-name"]')
            .clear()

        cy.get('[data-cy="slot-name"]')
            //.contains('Name')
            .clear()
            .click({force:true})
            .type(addValue+String(tx))        

        cy.get('[data-cy="slot-description"]')
            //.contains('Beschreibung')
            .click({force:true})
            .clear()
            .type(addValue)

        // Check for Slot-Type disabled or Not
        // Slot-Type Mast be disabled
        cy.log('Slot-Type Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')
        
        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Initialer Wert')
        //     .click({force:true})
        //     .type('example Text')
        cy.get('[data-cy="slot-text-initialvalue"]')
            .click()
            .clear()
            .type('example Text')

        cy.get('[data-cy="save-button"]')
            .click()
            .wait(500)
        
        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                //Der Slot konnte nicht gespeichert werden. 
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Der Slot konnte nicht gespeichert werden. ')
                })

        cy.log('Passed 1')

        // Giving a valid Name to return to Slot
        cy.get('[class="v-input__append-inner"]')
            .first()
            .click({force:true})
            .type(addValue+String(l*t))
        
        // // Back to Slot-page by clicking Slot
        // cy.get('[data-cy="navDrawerSlots"]')
        //     .contains('Slots')
        //         .click({force:true})

        // Clicking save-button
        cy.get('[data-cy="save-button"]')
            .click()
            .wait(300)
        
        /* Slot-Typ */
        // 1. Text
            
        cy.log('Text')
        cy.log('Line 1372')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('Text')
            .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[class="v-input__append-inner"]').eq(3)
            .click({force:true})            

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
 
        // Add a Slot value where Slot-Type is "Text"
        cy.get('[data-cy="slot-create"]')
            .click({force:true})

        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(addValue+String(t*c))
            cy.log(t*c)

        cy.get('[data-cy="slot-description"]')
            .click({force:true})
            .type(addValue+String(t))
        
        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 1. Selecting Text
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})
        
        cy.get('[data-cy="slot-text-initialvalue"]')
            .click({force:true})
            // Typing Text
            .type('example Text'+String(t))

        // Click Anlegen
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click({force:true})
            .wait(500)
            
        cy.log('Line 1428')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('Text')
            .click({force:true})

        // Removing Slot-Typ Value by clear method
        cy.get('[data-cy="slot-text-initialvalue"]')
            .clear()
            .type('New Value'+String(t))

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        cy.url().should("eq", "http://localhost/trainingsdaten/slot/");

        // // Selecting Entire Table
        // cy.get('[class="v-select__slot"]')
        //     .click()
        //     .wait(500)
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //         .click()

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Text')
        
        cy.log('Line 1453')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .first()
            .should('have.text', 'initial: ' +'„New Value'+String(t)+'“') 
            .wait(200)

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
            .type('List')
        
        //2. List
        cy.log('2. List')

        // cy.get('[data-cy="slot-table-search"]')
        //     .click()
        //     type('List')
        
        cy.log('Line 1468')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('List')
            .click({force:true})

        // // // Remove Name by clicking "X"        // temporary turn off
        // cy.log('Remove Name by clicking "X"')    // take a look later
        
        // cy.get('[class="v-input__append-inner"]').eq(3).click()
        cy.get('[data-cy="slot-list-initialvalue"]')
            .click()
            .clear()

        // // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
    
        // // Add a Slot value where Slot-Type is "List"
        cy.get('[data-cy="slot-create"]')
            .click({force:true})

        cy.get('[data-cy="slot-name"]')
            .click({force:true})
            .type(addValue+String(l*c))
            cy.log(l*c)

        cy.get('[data-cy="slot-description"]')
            .click({force:true})
            .type(addValue+String(l))
        
        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 2. Selecting List
        cy.get('[class="v-list-item__content"]')
            .contains('List')
            .click({force:true})
        
        cy.get('[data-cy="slot-list-initialvalue"]')
            .click({force:true})
            // Typing Value
            .type('example List'+String(l))

        // Click Anlegen
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click({force:true})
            .wait(500)

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('List')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()
        
        cy.log('Line 1524')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('List')
            .click({force:true})

        // Removing Slot-Typ Value by clear method
        cy.get('[data-cy="slot-list-initialvalue"]')
            .clear()
            .type('New Value'+String(l))

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .click()
            .wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click({force:true})
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.log('l '+String(l))
        
        cy.log('Line 1549')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .contains('New Value'+String(l))
            .should('have.text', 'initial: ' +'„New Value'+String(l)+'“') 

        //3. Any
        
        cy.log('3. Any')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()
    
    cy.log('Line 1568')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Any')
        .click({force:true})

    // Remove Name by clicking "X"
    cy.get('[class="v-input__append-inner"]').eq(3)
        .click()       
        .wait(500)     

    // Back to Slot-page by clicking Slot
    cy.get('[data-cy="navDrawerSlots"]')
        .contains('Slots')
            .click()

    // Add a Slot value where Slot-Type is "Any"
    cy.get('[data-cy="slot-create"]')
        .click({force:true})

    cy.get('[data-cy="slot-name"]')
        .click({force:true})
        .type(addValue+String(a*c))
        cy.log(a*c)

    cy.get('[data-cy="slot-description"]')
        .click({force:true})
        .type(addValue+String(a))
    
    cy.get('[class="v-select__slot"]')
        .contains('Slot-Typ')
        .click({force:true})

    // 1. Selecting Slot-Typ "Any"
    cy.get('[class="v-list-item__content"]')
        .contains('Any')
        .click({force:true})
    
    cy.get('[data-cy="slot-any-initialvalue"]')
        .click({force:true})
        // Typing Text
        .type('example Value'+String(a))

    // Click Anlegen
    cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
        .click({force:true})

    cy.wait(500)

    // Selecting Entire Table
    cy.get('[class="v-select__slot"]').click()
    cy.get('[class="v-list-item__content"]')
        .contains('Alle')
            .click()
    
    cy.log('Line 1623')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Any')
        .click({force:true})

    // Removing Slot-Typ Value by clear method
    cy.get('[data-cy="slot-any-initialvalue"]')
        .clear()
        .type('New Value'+String(a))

    // Back to Slot-page by clicking Slot
    cy.get('[data-cy="navDrawerSlots"]')
        .contains('Slots')
            .click()

    cy.url().should("eq", "http://localhost/trainingsdaten/slot/");

    // Selecting Entire Table
    cy.get('[class="v-select__slot"]').click()
    cy.get('[class="v-list-item__content"]')
        .contains('Alle')
            .click()
    
    cy.log('Line 1648')
    cy.get('tbody')
        .find('tr')
        .find('td:nth-child(4)')
        .contains('New Value'+String(a))
        .should('have.text', 'initial: ' +'„New Value'+String(a)+'“') 
        .wait(200)

        //4. Bool
            
        cy.log('Bool')
        cy.log('Line 1662')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})

        // Remove Name by clicking "X"
        cy.get('[data-cy="slot-bool-initialvalue-remove"]')
            .click({force:true})            

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')
        
        cy.log('Line 1683')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', '')
 
        // Add Initial Value "True"
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})
        
        cy.get('[class="v-label theme--light"]')
            .contains('Wahr')
            .click()
            
        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="true"]').eq(0)
            .should('be.checked')

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Initial:Wahr
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')
        
        cy.log('Line 1714')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'initial: Wahr')

        // Add Initial Value "False"
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Bool')
            .click({force:true})
        
        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="false"]').eq(0)
            .click({force:true})
            
        cy.get('[class="v-input--selection-controls__input"]')
            .find('[value="false"]').eq(0)
            .should('be.checked')

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Initial:Wahr
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Bool')
        
        cy.log('Line 1745')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'initial: Falsch')

        // Clear Search Value
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()

        //4. Categorical
            
        cy.log('Categorical')

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
            .type('Categorical')

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Categorical')
            .click({force:true})

        cy.log('Slot-Type: Category Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')
        
        // Remove Name by clicking "X"
        cy.log('Not Clicking "X" if length less than 3')
        cy.get('[class="v-input__icon v-input__icon--clear"]').then((xRemove) => {

            if(xRemove.find('[class="v-icon notranslate v-icon--link theme--light"]').length < 3) {

                cy.log('If Statement True')

                // Back to Slot-page by clicking Slot
                cy.get('[data-cy="navDrawerSlots"]')
                .contains('Slots')
                    .click()
            }

            else {
                cy.log('If Statement False')
                cy.get('[class="v-input__icon v-input__icon--clear"]').eq(2).click()

                // Back to Slot-page by clicking Slot
                cy.get('[data-cy="navDrawerSlots"]')
                    .contains('Slots')
                    .click()
            }
        })          
        cy.log('Line 1803')
        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')
        cy.log('l '+String(l)+', '+'b '+String(b))
        
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        var inName1
        var inName2

        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="slot-categorical-name"]').eq(0)
            .invoke('val').as('name1')
                    
        cy.get('@name1').then((name1) => {
            cy.log(name1) //prints name
            inName1 = name1
            cy.log(inName1)
        })

        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="slot-categorical-name"]').eq(1)
            .invoke('val').as('name2')
                
        cy.get('@name2').then((name2) => {
            cy.log(name2) //prints name
            inName2 = name2
            
            cy.log(inName2)
        })

        cy.get('[data-cy="abort-button"]')
            .click()
        
        cy.log('inName1')
        cy.log(inName1)
        
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')

        cy.log('Line 1851')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(4)')
            .then(($categoryAssert) => {
                cy.log('inName')
                cy.log(inName2)
                expect($categoryAssert).to.have.text(''+inName1+', '+inName2+' ')
                //expect($categoryAssert).to.have.text(inName1+', '+inName2+' '+'| '+'initial: '+inName2)
            })
 
        // Add Initial Value "True"
        cy.log('Line 1864')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(3)')
            .contains('Categorical')
            .click({force:true})

        cy.get('[class="v-select__selections"]')
            .find('[type="text"]').eq(1)
            .click({force:true})
        
        cy.get('[class="v-list-item v-list-item--link theme--light"]')
            .last()
            .click()
            
        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Categorical')
        
        cy.log('Line 1888')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(4)')
            .then(($categoryAssert2) => {

                //expect($categoryAssert2).to.have.text(inName1+','+inName2)
                expect($categoryAssert2).to.have.text(inName1+', '+inName2+' '+'| '+'initial: '+inName2)
            })

        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
        
        // 5. Float
        cy.log('Float')
        cy.log('Line 1903')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Float')
            .click({force:true})
        
        cy.log('Slot-Type: Float Mast be disabled')

        cy.get('[class="v-label v-label--active v-label--is-disabled theme--light"]')
            .contains('Slot-Typ')
            .get('[class="v-select__selections"]')
            .find('input')
            .should('have.disabled', 'disabled')

        // Clear Min, Max, Initial Value
        cy.get('[data-cy="slot-float-minvalue"]')
            .clear()
        cy.get('[data-cy="slot-float-maxvalue"]')
            .clear()
        cy.get('[data-cy="slot-float-initialvalue"]')
            .clear()   
            
        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Float')

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'min: 0 max: 1 ')
           
        // Clear Search
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()

        //add values to slot for test search field
        var flotValue = [-2, -1, 0, 1]
        cy.wrap(flotValue).each((index) => {

            // Add Only Min Value
            cy.get('tbody')
            .find('tr')
            .find('td:nth-child(3)')
            .contains('Float')
            .click({force:true})

            cy.get('[data-cy="slot-float-minvalue"]')
                .clear()
                .type(index)

            cy.get('[data-cy="slot-float-maxvalue"]')
                .clear()
                .type(index+1)
            
            // Back to Slot-page by clicking Slot
            cy.get('[data-cy="navDrawerSlots"]')
                .contains('Slots')
                    .click()

            cy.get('[data-cy="slot-table-search"]')
                .click()
                .type('Float')
            const maxIndex = index + 1
            if (maxIndex == 0) {

                let maxIndex = 1

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').eq(0)
                    .should('have.text', 'min: '+String(index)+ ' max: '+String(maxIndex)+' ')
            }
            else {
                cy.get('tbody')
                .find('tr')
                .find('td:nth-child(4)').eq(0)
                .should('have.text', 'min: '+String(index)+ ' max: '+String(maxIndex)+' ')
            }

            cy.get('[data-cy="slot-table-search"]')
                .click()
                .clear()
        })

        // Add Only Min Value
        cy.get('tbody')
        .find('tr')
        .find('td:nth-child(3)')
        .contains('Float')
        .click({force:true})

        // Clear Min, Max, Initial Value
        cy.get('[data-cy="slot-float-minvalue"]')
            .clear()
        cy.get('[data-cy="slot-float-maxvalue"]')
            .clear()
        cy.get('[data-cy="slot-float-initialvalue"]')
            .clear()
            .type(5)

        // Assert Error Message
        cy.get('[class="v-messages__message"]')
        .should('have.text', 'Der initiale Wert eines Slots des Typs „Float” muss zwischen minimalem und maximalem Wert liegen')

        cy.get('[data-cy="slot-float-initialvalue"]')
            .clear()
            .type(1)

        // Back to Slot-page by clicking Slot
        cy.get('[data-cy="navDrawerSlots"]')
        .contains('Slots')
            .click()

        // Assert Saved value, Empty
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .type('Float')

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)').eq(0)
            .should('have.text', 'min: 0 max: 1 | initial: 1')

        // Clear Search
        cy.get('[data-cy="slot-table-search"]')
            .click()
            .clear()
    }

    slotSuchen() {
        ///* Search Option testing *///

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

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()
        
        // Single Intent
        cy.get('[data-cy="slot-table-search"]')
            .click({force:true})
                .type('weather')

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('contain', 'weather')
        
        // Multiple Intent
        cy.get('[data-cy="slot-table-search"]')
            .clear()
                .type('test')
        
        cy.get('tbody')
            .find('tr')
            .should('contain','test')

        // Nonexisting Intent
        cy.get('[data-cy="slot-table-search"]')
            .clear().type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="slot-table-search"]')
            .clear() 
    }

    slotLoeschen() {

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

        // Select Whole Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle').click()
        cy.wait(500)

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                const rowValue = $text.text()
                cy.log(rowValue)

                cy.get('tbody')
                    .find('tr')
                    .last()
                    .find('[data-cy="slot-remove"]')
                    .click({force:true})
                
                cy.visit('http://localhost/trainingsdaten/slot/')
                cy.wait(500)

                cy.get('tbody')
                    .find('tr')
                    .last()
                    .find('td:nth-child(1)').then(function($text2) {
                        cy.log($text2.text())
                        cy.log(rowValue)

                        cy.wrap($text2).should('not.have.text', rowValue)
                    })
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onSlot = new slots()