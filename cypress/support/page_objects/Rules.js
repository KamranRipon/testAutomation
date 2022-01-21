import { capitalize, find, first, values } from "lodash"

const i = Math.floor(Math.random() * 5000);
const b = Math.floor(Math.random() * 1000);
const r = Math.floor(Math.random() * 1500);
const a = Math.floor(Math.random() * 2000);
const ei = Math.floor(Math.random() * 3000);
const eb = Math.floor(Math.random() * 3500);
const er = Math.floor(Math.random() * 4000);
const ea = Math.floor(Math.random() * 4500);
const x = Math.floor(Math.random() * 3500);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class rules {

    rulesAnlegen() {

        /* Rules Anlegen Testing */

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

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        
        // Clicking Rules Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .should('have.attr', 'href')
            .then(($href) => {
                cy.visit($href)
                        })

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/neu/");

        // A. Synonym Anlegen
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Synonym
                1.1.1 Warning message
                1.1.2 Warning Notification
            1.2 Synonyms Example
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Synonym
            2.2 Example
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
                3.2.1 Assert Synonym name in Synonym talbe
                3.2.2 Assert name in example table
                3.2.3 Assert example number for each synonym in synonym table
        4. Leave site via menu or breadcrump, data must not be saved
        */

        /* Add Action Name. Require to test Rules */

        // Entering to Action tab
        cy.get('[data-cy="navDrawerActions"]')
            .click()

        // Clicking Action Hinzufuegen
        cy.get('[data-cy="action-create"]')
            .click()
        
        // add a Name to action
        cy.get('[data-cy="action-name"]')
            .click()
            .type('Action'+String(a))
        
        // add a descriptions or python code
        cy.get('[data-mode-id="python"]')
            .click()
            .type('pring("Hello World!")')

        // Clicking Anlegen
        cy.get('[data-cy="create-button"]')
            .click()

        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Action'+' "Action'+String(a)+'" '+ 'wurde erfolgreich gespeichert ')

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Assert Data in Action Table
        cy.log('Line 110')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', 'Action'+String(a))

        cy.wait(500)
        // Closing success message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        // 1.1 Rules Name Anlegen
        // 1.1.1 Warning message

        // Entering to Intents
        cy.get('[data-cy="navDrawerIntents"]')
            .click({force:true})
            .wait(500)

        // Clicking intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .click({force:true})

        // Add Intent Name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .click({force:true})
            .type(addValue+String(i))
        
        // Assert Visibility of remove button
        cy.get('[class="v-input__icon v-input__icon--clear"]')
            .find('button.v-icon')
            .should('be.visible')
        
        // Add a description
        cy.get('[data-cy="intent-description"]')
            .clear()
            .click({force:true})
            .type(addValue+String(b))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(500)

        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()
        // Assert initial warning Message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')
        
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .click({force:true})
            .type(' ')

        // Assert warning message after add space to input field
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name enthält ungültige Zeichen!')

        // Try to save with empty name
        // Click Anlegen
        cy.log('Line 184')
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(r))
        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[data-cy="create-button"]')
            .click()

        cy.wait(500)
        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(r)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules TAble
        cy.log('Line 229')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(r))

        //3. Check for duplicate Name
        cy.log('3. Check for duplicate Name')
        cy.log('Line 237')
        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            //.clear()
            .type(addValue+String(r))

        // Select a step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[data-cy="create-button"]')
            .click()

        cy.wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        //4. Check for duplicate Name
        cy.log('4. Saving without steps, data must not save in Rules Table')
        cy.log('Line 284')
        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            //.clear()
            .type(addValue+String(r*a))
        
        cy.get('[data-cy="create-button"]')
            .click()
        
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        //5. Saving works if Data is Correct
        cy.log('Line 307')
        cy.log('5. Saving works if Data is Correct')

        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[data-cy="create-button"]')
            .click()

        cy.wait(500)
        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
                .should('have.text', ' Die Rule'+' "'+addValue+String(r*a)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules TAble
        cy.log('Line 337')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(r*a))

        // 6. Number of Rules must show correctly in Intent Table
        cy.get('tbody')
            .find('tr')
            .then(function($countTr) {
                const NoOfRules =$countTr.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})

                cy.get('[data-cy="intent-table-search"]')
                    .click()
                    .type(addValue+String(i))

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(NoOfRules)+' ')
            })

        // Clear Search Field
        cy.get('[data-cy="intent-table-search"]')
            .clear()

        // 7. Leave Site with Breadcrump does not save data

        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(r*i))  

        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
        .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})
            
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        // Assert data in Rules table. Data must not be in the table

        cy.get('[data-cy="rule-table-search"]')
            .click()
            .type(addValue+String(r*i))
        
        cy.log('Line 416')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', addValue+String(r*i))
    }

    rulesBearbeiten() {

        /* Rules Anlegen Testing */

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

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");

        // // Enter Intent
        // // Entering to Intents
        // cy.get('[data-cy="navDrawerIntents"]')
        //     .click({force:true})
        //     .wait(500)

        // // Clicking intent Hinzufuegen
        // cy.get('[data-cy="intent-create"]')
        //     .click({force:true})

        // // Add Intent Name
        // cy.get('[data-cy="intent-name"]')
        //     .clear()
        //     .click({force:true})
        //     .type(addValue+String(ei))
        
        // // Add a description
        // cy.get('[data-cy="intent-description"]')
        //     .clear()
        //     .click({force:true})
        //     .type(addValue+String(eb))

        // // Click Anlegen
        // cy.get('[data-cy="create-button"]')
        //     .click()
        //     .wait(500)

        // // Back to Intents page
        // cy.get('[data-cy="navDrawerIntents"]')
        //     .click({force:true})
        //     .wait(500)
        
        // 1.1 Edit Rules Name
        // 1.1.1 Warning message

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Enter to first row of the intent Table
        var inName
        cy.wait(500)
        cy.log('1.1 Edit Rules Name')
        cy.log('Line 489')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')

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
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(4)')
                    .contains(max_val)
                    .click()

                // Save Intent Name for letar Assertion
                cy.get('[class="v-text-field__slot"]').find('[data-cy="intent-name"]').invoke('val').as('name')
                    
                    cy.get('@name').then((name1) => {

                      cy.log(name1) //prints name

                      inName = name1

                      cy.log(inName)

                      

                    })
                    // .find('tr')
                    // .then(($intentName) => {
                    //     intentname = $intentName.text()

                    //     return intentname
                    // })

                // cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                //     .find('tr')
                //     .find('td:nth-child(4)')
                //     .contains(max_val)
                //     .click({force:true})
            })
            
        // Entering to rules table
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()
            .wait(500)
        
        cy.log('Line 555')
        cy.log('Intent Name')
        cy.log(inName)

        // Entering to first row of rules table
        cy.log('Line 560')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(3)')
            .click()
            .wait(500)

        // Clear Rules Name field
        cy.get('[data-cy="rule-name"]')
            .clear()
        
        // Assert initial warning Message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')
        
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .click({force:true})
            .type(' ')

        // Assert warning message after add space to input field
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name enthält ungültige Zeichen!')

        cy.get('[data-cy="rule-name"]')
            .clear()

        // 1.2 Leave site with breadcrump 
        //Case 1: Rules name Empty
        cy.log('Line 533')
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()
            .wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 1.2 Leave site with breadcrump 
        //Case 2: Rules name not empty Empty but remove all steps
        cy.log('Line 547')

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(er))

        // Remove steps
        cy.get('[data-cy="rule-remove-step"]')
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()
            .wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[data-cy="errorMessageBody"]')
            .should('have.text', ' Die Schritte der Rule sind ungültig ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 1.2 Leave site with breadcrump 
        //Case 3: add a valid rules name and have at least one stape

        cy.log('Line 575')
        
        // Select steps
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        // Select Action or Response from list
        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        // leave site with breadcrump
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(er)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules Table
        cy.log('Line 605')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(er))

        // 1.3 Leave Site by "Abbrechen" button
        cy.log('Line 613')
        // Entering to first Row of Rules table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        // Clear and add a unique name to Rules Name field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addExample+String(er*ei))
        
        // Clicking Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()

        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type(addExample+String(er*ei))

        // Assert data in the Rules Table
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', addExample+String(er*ei))

        // Clear Search Field
        cy.get('[data-cy="rule-table-search"]')
            .clear()

        //1.4. Check for duplicate Name
        cy.log('1.4. Check for duplicate Name')
        cy.log('Line 647')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($dupRuleName) {

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .click()
                
                // Clear and add a Rule name
                cy.get('[data-cy="rule-name"]')
                    .clear()
                    .type($dupRuleName.text())

                cy.get('[class="v-breadcrumbs__item"]')
                    .contains('Rules')
                    .click()

                cy.log('Line 668')
                cy.get('[data-cy="errorMessageTitle"]')
                        .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

                // Clicking Abbrechen Button
                cy.get('[data-cy="abort-button"]')
                    .click()

                // Assert data in the Rules Table
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('not.have.text', $dupRuleName.text())
            })
            
        
        // 1.5. Saving works if Data is Correct
        cy.log('Line 685')
        cy.log('1.5. Saving works if Data is Correct')

        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(x))

        // Select step
        // cy.get('[class="v-select__slot"]')
        cy.log('Line 699')
        cy.get('[class="col col-4"]').eq(1)
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        cy.wait(500)
        // Assert Success Message

        cy.get('[data-cy="successMessageTitle"]')
                .should('have.text', ' Die Rule'+' "'+addValue+String(x)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules TAble
        cy.log('Line 726')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(x))

        // delet one stape
        cy.log('Line 795')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[data-cy="rule-remove-step"]').eq(1)
            .click()

        // Back to Rules Table
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()        

        // 6. Number of Rules must show correctly in Intent Table
        cy.log('Line 810')
        cy.get('tbody')
            .find('tr')
            .then(function($countTr2) {
                const NoOfRules2 =$countTr2.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})
                cy.log(addValue+String(i))
                cy.log(inName)
                cy.get('[data-cy="intent-table-search"]')
                    .click()
                    .type(inName)

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(NoOfRules2)+' ')

                // cy.get('[data-cy="intent-table-search"]')
                //     .clear()
            })

    }

    rulesSuchen() {

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {

                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                        .wait(500)
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                        .wait(500)
                }
        })
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            //.first()
            .find('td:nth-child(4)')
            .last()
            .click({force:true})
            .wait(500)
        
        // Entering to rules table
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()
            .wait(500)

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()
                
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .click({force:true})
            .type('test') 

        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        // Try to save with empty name
        // Click Anlegen
        cy.log('Line 843')
        cy.get('[data-cy="create-button"]')
            .click()    

        // Back to Rules Table
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Rules')
            .click({force:true})

            
        // Single Intent
        cy.get('[data-cy="rule-table-search"]')
            .click({force:true})
                .type('test')

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', 'test')
        
        // Multiple Intent
        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type(addValue)
        
        cy.get('tbody')
            .find('tr')
            .should('have.length', 2)
            .find('td:nth-child(1)')
            .should('contain',addValue)

        // Nonexisting Intent
        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="rule-table-search"]')
            .clear() 
    }

    rulesLoeschen() {

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {

                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                        .wait(500)
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerIntents"]')
                        .click()
                        .wait(500)
                }
        })

        // Enter to intent table Row
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(4)')
            ///////////////////////////////////////
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()

                var sp_vall2 = vall2.split(" ")
                
                var max_val2 = 0
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){
                    
                    if(sp_vall2[num2] > max_val2) {
                        max_val2 = sp_vall2[num2]
                    }
                }

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(4)')
                    .contains(max_val2)
                    .click({force:true})
            })
            ///////////////////////////////////////
            // .last()
            // .click()

        // Entering to rules tab
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Delete Row from Rules Table
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .then(function($rulesRowCount) {
                const countValue = $rulesRowCount.length

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .last()
                    .find('td:nth-child(4)')
                    .click()
                    
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()

                let newCountValue = countValue - 1

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .should('have.length', newCountValue)

                cy.get('[data-cy="navDrawerIntents"]')
                    .click()

                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .last()
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(newCountValue)+' ')
                
            })

    }
}


// Exportint class frontEnd to End2End to test
export const onRules = new rules()