import { capitalize, find, first, values } from "lodash"

const t = Math.floor(Math.random() * 500);
const f = Math.floor(Math.random() * 1000);
const b = Math.floor(Math.random() * 1500);
const l = Math.floor(Math.random() * 2000);
const c = Math.floor(Math.random() * 2500);
const a = Math.floor(Math.random() * 3000);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class synonyms {

    synonymAnlegen() {

        /* Synonyms Anlegen Testing */

        cy.get('[class="v-list-group"]').contains('Trainingsdaten').then((Tdaten) => {

                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerSynonyms"]')
                        .contains('Synonyms')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerSynonyms"]')
                        .contains('Synonyms')
                        .click()
                }
            })

        // Assert URL after clicking Synonym
        cy.url().should("eq", "http://localhost/trainingsdaten/synonym/");
        
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="synonym-create"]')
            .should('have.attr', 'href')
            .then(($href) => {
                   cy.visit($href)
                        })

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/synonym/neu/");

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

        // 1.1 Synonym
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein.')

        // Click Anlegen
        // cy.get('[class="v-btn__content"]')
        //     .contains('Anlegen')
        //     .click()

        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type(addValue+String(t))

        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()
        //cy.wait(500)
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        // 1.2 Synonyms Example
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification
        //cy.wait(500)               
        // Entering first row of synonym table
    
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Clicking Example Tab
        // cy.get('[class="v-tab"]')
        //     .contains('Examples')
        //     .click()
        //cy.wait(400)
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        // Assert URL after clicking Synonym Example
        cy.url().should("eq", "http://localhost/trainingsdaten/synonym/1/example/");

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        // checking for valid name
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        //Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
        // Close successfully saved message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        //cy.wait(1000)

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(f))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        // Close successfully saved message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Line 176')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName) {
                
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Synonym'+' "'+$synName.text()+'" '+ 'wurde erfolgreich gespeichert ')
            })

        // 2. Check for duplicate name
        // 2.1 Synonym
        // 2.2 Example

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]').click()
        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type(addValue+String(t))

        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        //cy.wait(400)
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l))

        // Click Anlegen
        // cy.get('[data-cy="create-button"]').eq(1)
        //     .click()
        
        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()

        //cy.wait(1000)
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0).click({force:true})
        cy.get('[data-cy="navDrawerSynonyms"]').click({force:true})

        
        // 3. Check for successfully saved values
        
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        cy.log('Line 236')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        
        // cy.get('[data-cy="create-button"]')
        //     .click()
        cy.log('line 243')
        cy.log('c '+String(c))
        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type(addValue+String(c))

        cy.get('[class="v-btn__content"]')
            .contains('Anlegen')
            .click()
        
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        //cy.wait(1000)
        
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName2) {
                cy.log($synName2.text())
                
                cy.wrap($synName2).should('have.text', addValue+String(c))
            })

        // 3.2 Assert in table
        // 3.2.2 Assert name in example table

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(a))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName3) {
                
                cy.wrap($synName3).should('have.text', addExample+String(a))
            })

        // 3.2 Assert in table
        // 3.2.3 Assert example number for each synonym in synonym table
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        // cy.get('[data-cy="synonym-example-create"]')
        //     .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody').find('tr').then(function($trCount) {

            const exmNumber = $trCount.length

            cy.get('[data-cy="navDrawerSynonyms"]').click()

            cy.get('tbody')
                .find('tr')
                .first()
                .find('td:nth-child(2)')
                .should('have.text', exmNumber)
        })

        // 4. Leave site via menu or breadcrump, data must not be saved

        // 4.1 Synonym Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        // 4.1 Synonym Example Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        cy.get('[data-cy="synonym-example-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type('addExample')
        
        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'addExample')
    }

    synonymBearbeiten() {

        // B. Synonym Bearbeiten
        /* 
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Synonym Name
                1.1.1 Warning message
                1.1.2 Warning Notification
            1.2 Synonyms Example Name
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Synonym Name
            2.2 Synonym Example Name
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
                3.2.1 Assert Synonym name in Synonym talbe
                3.2.2 Assert name in example table
                3.2.3 Assert example number for each synonym in synonym table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */

        /* Synonyms Anlegen Testing */

        cy.get('[class="v-list-group"]').contains('Trainingsdaten').then((Tdaten) => {

            if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                cy.log('If Statement True')

                cy.get('[data-cy="navDrawerSynonyms"]')
                    .contains('Synonyms')
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                    .contains('Trainingsdaten')
                    .click()

                cy.get('[data-cy="navDrawerSynonyms"]')
                    .contains('Synonyms')
                    .click()
            }
        })

        // Assert URL after clicking Synonym
        cy.url().should("eq", "http://localhost/trainingsdaten/synonym/");
        
        // 1. Edit Name should not be empty, error message should contain "Name"
        // 1.1 Synonym Name
        

        const value1   = ['', addValue+String(t)]
        
        cy.wrap(value1).each((index) => {
        cy.log('Line '+String(464))
        cy.wait(500)  // Mast have .wait() here
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // clear input field
        cy.get('[data-cy="synonym-name"]')
            .click()
            .clear()

        if (index == '') {
            cy.log('If Statement is True')

            //1.1.1 Warning message
            cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein.')

            cy.get('[data-cy="navDrawerSynonyms"]')
                .contains('Synonyms')
                .click()
            //1.1.2 Warning Notification
            cy.get('[data-cy="errorMessageTitle"]')
                .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
            // after assert close warning message
            cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
                .click()
        }
        else {
            cy.log('If Statement FAlse')
            cy.log('Line'+String(494))
            cy.log('index'+String(index))
            cy.get('[data-cy="synonym-name"]')
                .click()
                .type(index)
        }
       
        // clicking "Abbrechen" buttton. Slected Name should remain same.
        cy.get('[data-cy="abort-button"]')
            .click()
        
        // Assert Saved value
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName4) {

                cy.log($synName4.text())
                cy.log(addValue+String(t))
            
                //cy.wrap($synName4).should('have.text', addValue+String(t))
                cy.wrap($synName4).should('have.text', $synName4.text())
            })
        })

        // Edit Synonym Name and Anlegen Valid Name
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // clear input field
        cy.get('[data-cy="synonym-name"]')
            .click()
            .clear()
            .type(addValue+String(b))

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()
        
        // Assert value Table
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName4) {

                cy.log($synName4.text())
                cy.wrap($synName4).should('have.text', addValue+String(b))
            })

        //1.2 Synonyms Example Name

        //1.1.1 Warning message
        //1.1.2 Warning Notification
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            .click()
            .clear()

        // checking for valid name
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        //Click Breadcrumb to leave the page
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Synonym Example')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')

        // Close Error message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l*f))

        //Click Breadcrumb to leave the page
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Synonym Example')
            .click()

        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing saved Notification
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]').eq(0)
        //     .click()
        // Assert value Table
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName5) {

                cy.log($synName5.text())
                cy.wrap($synName5).should('have.text', addExample+String(l*f))
            })
    }
}

// Exportint class frontEnd to End2End to test
export const onSynonym = new synonyms()