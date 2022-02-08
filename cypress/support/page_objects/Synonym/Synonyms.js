import { capitalize, find, first, values } from "lodash"

const t = Math.floor(Math.random() * 500);
const f = Math.floor(Math.random() * 1000);
const b = Math.floor(Math.random() * 1500);
const l = Math.floor(Math.random() * 2000);
const c = Math.floor(Math.random() * 2500);
const a = Math.floor(Math.random() * 3000);
const x = Math.floor(Math.random() * 3500);

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

        // 1.1 Synonym Name
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification

        cy.get('[data-cy="synonym-name"]')
            .click({force:true})
            
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein.')

        // Click Anlegen
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
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()
        cy.log('Line 108')

        // /* Delete first row of Synonym table and just keep one row in the table*/
        // cy.get('tbody').then((delRow) => {
        //     if(delRow.find('tr').length > 1) {
        //         cy.get('[class="v-icon notranslate theme--light error--text"]').eq(0)
        //             .click()
        //     }
        // })

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert VAlue in Synonyms TAble
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Line 120')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                
                cy.wrap($synName1).should('have.text', addValue+String(t))
                //cy.wrap($synName1).should('have.text', $synName1.text())
            })

        // 1.2 Synonyms Example Name
        // 1.1.1 Warning message
        // 1.1.2 Warning Notification

        // Entering first row of synonym table
        cy.log('Test valid Name of Synonym Example')
        cy.log('Line 137')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Clicking Example Tab
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // Assert URL after entering to Synonym Example
        // cy.url().should("eq", "http://localhost/trainingsdaten/synonym/1/example/");
        
        //Click Example Hinzufuegen
        cy.get('[data-cy="synonym-example-create"]')
            .click()

        // checking for valid name Notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        //save without name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
        // Enter a valid Name             
        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l))

        // Save Name, Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
        cy.log('Line '+String(174))
        // Assert Successfully saved example name Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')

        // Select Entire table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.log('Line 194')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synExmName) {
                
                cy.wrap($synExmName).should('have.text', addExample+String(l))
            })
        //cy.wait(250)
        // Close successfully saved message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        //cy.wait(1000)

        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Text')
        //     .click({force:true})
        //     .type(addExample+String(f))

        // // Click Anlegen
        // cy.get('[data-cy="create-button"]').eq(0)
        //     .click()

        // // Close successfully saved message
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        //cy.wait(25000)
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Line 224')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName2) {
                
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Synonym'+' "'+$synName2.text()+'" '+ 'wurde erfolgreich gespeichert ')
            })

        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 2. Check for duplicate name
        // 2.1 Synonym Name
        // 2.2 Synonym Example Name
        cy.log('2. Check for duplicate name')
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

        // Assert Value in Synonym TAble
        cy.get('[data-cy="synonym-table-search"]')
            .click({force:true})
            .type(addValue+String(t))
    
        cy.get('tbody').find('tr').then(function($NrRow) {
                if($NrRow.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow.find('td:nth-child(1)'))
                        .should('have.text', addValue+String(t))
                }
            })
        // Clear the search field
        cy.get('[data-cy="synonym-table-search"]')
            .clear()

        // Check Unique Name for Synonym Example
        cy.log('Log 273')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
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

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        // Assert Value in Synonym Table
        cy.log('Line 301')
        cy.get('[data-cy="synonym-example-table-search"]')
            .click({force:true})
            .type(addExample+String(l))
    
        cy.get('tbody').find('tr').then(function($NrRow2) {
                if($NrRow2.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow2.find('td:nth-child(1)'))
                        .should('have.text', addExample+String(l))
                }
            })

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        cy.get('[data-cy="navDrawerSynonyms"]').click({force:true})

        
        // 3. Check for successfully saved values
        
        //     3.2 Assert in table
        //         3.2.1 Assert Synonym name in Synonym talbe
        
        cy.log('Line 324')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.get('[data-cy="synonym-create"]')
            .click({force:true})
        
        // cy.get('[data-cy="create-button"]')
        //     .click()
        
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
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()

        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
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
        
        cy.log('Line 421')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()

        // cy.get('[data-cy="synonym-example-create"]')
        //     .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody').find('tr').then(function($trCount) {
            cy.log('Line 423')
            const exmNumber = $trCount.length

            cy.get('[data-cy="navDrawerSynonyms"]').click()

            cy.get('tbody')
                .find('tr')
                .first()
                .find('td:nth-child(2)')
                .should('have.text', ' '+String(exmNumber)+' ')
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
        
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
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
        4. Check number of example in Synonym TAble
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */

        /* Synonyms Bearbeiten Testing */

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

        // add a value to synonym table

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('[data-cy="synonym-create"]')
            .click()

        cy.get('[data-cy="synonym-name"]')
            .click()
            .type(addValue+String(x))

        cy.get('[data-cy="create-button"]')
            .click()
       
        const value1   = ['', addValue+String(x)]
        
        cy.wrap(value1).each((index) => {
            cy.log('Line '+String(585))
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

                // clicking "Abbrechen" buttton. Slected Name should remain same.
                cy.get('[data-cy="abort-button"]')
                    .click()
            }
            else {
                cy.log('If Statement FAlse')
                cy.log('Line'+String(602))
                cy.log('index'+String(index))
                cy.get('[data-cy="synonym-name"]')
                    .click()
                    .type(index)

                cy.get('[class="v-breadcrumbs__item"]')
                    .contains('Synonyms')
                    .click()
                
                cy.log('Line 612')

                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text',' Das Synonym konnte nicht gespeichert werden. ')
                
                // clicking "Abbrechen" buttton. Slected Name should remain same.

                // cy.get('[class="alert error white--text"]').then(function($errorMsg) {

                //     if($errorMsg.find('[class="mx-4 mt-1 mb-3"]')) {

                //         cy.log('if Statement True')

                //         cy.get('[data-cy="abort-button"]')
                //             .click({force:true})
                //     }

                //     else {
                //         cy.log('I Statment False')

                        
                //     }
                // })
                cy.get('[data-cy="abort-button"]')
                    .click({force:true})
            }
            
            // Assert Saved value
            cy.log('Line 640')
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
        cy.log('Edit Synonym Name and Anlegen Valid Name')
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

        // Closing saved Notification
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()

        cy.wait(500)
        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Das Synonym'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')


        
        // Closing saved Notification
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        
        // Assert value Table
        cy.log('Line 686')
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
        cy.log('Line 667')
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
        cy.log('Line 720')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName5) {

                cy.log($synName5.text())
                cy.wrap($synName5).should('have.text', addExample+String(l*f))
            })

        // Test duplicate Name
        cy.log('// Test duplicate Name')
        // Synonym Name
        cy.log('Line 768')

        // 2. Check for duplicate name
        // 2.1 Synonym Name
        // 2.2 Synonym Example Name
        cy.log('2. Check for duplicate name')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        
        cy.log('Line 742')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[data-cy="synonym-name"]')
            .clear()
            .click()
            .type(addValue+String(x))

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')

        cy.log('Line 792')
        cy.wait(250)
        cy.get('[data-cy="synonym-name"]')
            .clear({force:true})
            .wait(500)
            .click()
            .type(addValue+String(t*b))

        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.wait(500)

        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Das Synonym'+' "'+addValue+String(t*b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        //Assert value Table
        cy.log('Line 808')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($synName6) {

                cy.log($synName6.text())
                cy.wrap($synName6).should('have.text', addValue+String(t*b))
            })    

        // Check Unique Name for Synonym Example
        cy.get('[data-cy="navDrawerSynonyms"]').click()
        cy.log('Log 787')
        cy.log('Unique Name for Synonym Example')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        cy.wait(500)
        cy.get('[href="/trainingsdaten/synonym/1/example/"]')
            .click()

        cy.log('Line 797')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // cy.get('[data-cy="synonym-example-create"]')
        //     .click()

        cy.get('[data-cy="synonym-example-text"]')
            .clear()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            // .type(addExample+String(a))
            .type(addExample+String(2165))
       
        // cy.get('[class="v-btn__conten"]')
        //     .contains('Anlegen')
        //     .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text', ' Das Synonym konnte nicht gespeichert werden. ')
        
        cy.get('[class="v-icon notranslate theme--dark"]').eq(0).click({force:true})

        // cy.get('[data-cy="abort-button"]')
        //     .click()

        // Assert Value in Synonym Table
        cy.log('Line 828')
        cy.get('[data-cy="synonym-example-table-search"]')
            .click({force:true})
            .type(addExample+String(a))
    
        cy.get('tbody').find('tr').then(function($NrRow3) {
                if($NrRow3.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow3.find('td:nth-child(1)'))
                        .should('not.have.text', addExample+String(l))
                }
            })

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()
        cy.log('846')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-example-text"]')
            .clear()

        cy.get('[class="v-text-field__slot"]')
            .contains('Text')
            .click({force:true})
            .type(addExample+String(l*b))

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Das Synonym'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')

        cy.log('Line 867')
        cy.get('[data-cy="synonym-example-table-search"]')
            .click({force:true})
            .type(addExample+String(l*b))
    
        cy.get('tbody').find('tr').then(function($NrRow4) {
                if($NrRow4.find('td:nth-child(1)').length <= 1) {
                    cy.wrap($NrRow4.find('td:nth-child(1)'))
                        .should('have.text', addExample+String(l*b))
                }
            })

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

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
            cy.log('Line 938')
            const exmNumber1 = $trCount.length
            cy.log(exmNumber1)

            cy.get('[data-cy="navDrawerSynonyms"]').click()

            cy.get('tbody')
                .find('tr')
                .first()
                .find('td:nth-child(2)')
                .should('have.text', ' '+String(exmNumber1)+' ')
        })

        // 4. Leave site via menu or breadcrump, data must not be saved

        // 4.1 Synonym Name
        // 4.1.1 Leave Site by breadcrump
        cy.log('4. Leave site via menu or breadcrump, data must not be saved')
        cy.log('4.1 Synonym Name')
        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .clear()
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerSynonyms"]')
            .click()

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('[data-cy="synonym-table-search"]')
            .click()
            .type('someName')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', 'someName')

        cy.get('[data-cy="synonym-table-search"]')
            .clear()

        // 4.1 Synonym Example Name
        cy.get('[data-cy="navDrawerSynonyms"]').click()
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
            .clear()
            .type('addExample')
        
        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Synonym Example ')
            .click()

        cy.get('[data-cy="synonym-example-table-search"]')
            .click()
            .type('addExample')               

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', 'addExample')

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()

        // 4.2 Synonym Example Name
        // 4.1.1 Leave Site by Abbrechen
        cy.log('4.2 Synonym Example Name')
        cy.get('[data-cy="navDrawerSynonyms"]').click()

        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.get('[data-cy="synonym-name"]')
            .clear()
            .click({force:true})
            .type('someName2')
        // Leave Site by Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()

        // Select Entire Synonym Example Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('[data-cy="synonym-table-search"]')
            .click()
            .type('someName2')

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName2')

        cy.get('[data-cy="synonym-table-search"]')
            .clear()

        // 4.2 Synonym Example Name
        cy.log('Line 1031')
        cy.log('4.2 Synonym Example Name')
        cy.get('[data-cy="navDrawerSynonyms"]').click()
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
            .clear()
            .type('addExample2')

        // Leave Site by Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()
        
        cy.get('[data-cy="synonym-example-table-search"]')
            .click()
            .type('addExample2')               

        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'addExample2')

        cy.get('[data-cy="synonym-example-table-search"]')
            .clear()
        
        // Back to Synonym Page
        cy.get('[data-cy="navDrawerSynonyms"]').click()
    }

    synonymLoeschen() {

        /* Synonyms Loeschen Testing */

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

        //C. Synonym Loeschen
        // 4.1. Synonym Table
        cy.log('Line 1156')
        var noRow
        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .then(function($tbLength) {
                noRow = $tbLength.length
            }) 
                
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synName7) {
                cy.log($synName7.text())

                const tdValue = $synName7.text()

                cy.get('[data-cy="synonym-remove"]')
                    .last()
                    .click()

                // Confirm Delete message
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
                    .wait(500)

                // Update Table Length
                noRow = noRow - 1

                cy.get('[data-cy="synonym-table-search"]')
                    .click()
                    .type(tdValue)

                cy.get('tbody')
                    .find('tr')
                    .should('not.have.text', tdValue)

                cy.get('[data-cy="synonym-table-search"]')
                    .clear()

                // Assert Synonyms Table Length
                cy.log('Line 1206')
                cy.log('noRow '+String(noRow))
                cy.get('tbody')
                    .find('tr')
                    .should('have.length', noRow)
            })

            
        
        // 4.2. Synonym Example Name
        // Save number of row
        cy.log('Line 1209')

        // Selecting Entire Table
        // cy.get('[class="v-select__slot"]')
        //     .click()
        //     .get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .find('td:nth-child(2)')
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

                // Enter To a Synonym Row which contain more than one Example
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val)
                    .click()
            })
                
        // cy.get('[href="/trainingsdaten/synonym/1/example/"]')
        //     .click()
        // Clicking Example Tab
        cy.get('.v-slide-group__wrapper')
            .contains('Examples')
            .click()
            
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .then(function($tableLength) {
                noRow = $tableLength.length
                cy.log(noRow)
            })
        
        cy.log('Line 1264')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($synExmName2) {
                cy.log($synExmName2.text())

                const tdExValue = $synExmName2.text()

                cy.get('[data-cy="synonym-example-remove"]')
                    .last()
                    .click()

                // Confirm Delete message
                cy.get('[class="v-card v-sheet theme--light"]')
                    .find('.v-card__actions')
                    .find('button.v-btn:nth-child(3)')
                    .click()
                    .wait(500)

                // updated table lenght
                noRow = noRow - 1 

                cy.get('[data-cy="synonym-example-table-search"]')
                    .click()
                    .type(tdExValue)

                cy.get('tbody')
                    .find('tr')
                    .should('not.have.text', tdExValue)

                cy.get('[data-cy="synonym-example-table-search"]')
                    .clear()

                cy.get('tbody')
                    .find('tr')
                    .should('have.length', noRow)
                    // .then(function($exmTabLen) {
                    //     cy.log($exmTabLen.length)
                    // })
            })
    }

    synonymSuchen() {

        /* Test Synonym Suchen Field */

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

        
        // Anlegen some random name to Synonym Name
        // Synonym Name

        const ranSynName   = ['Syn1', 'Syn2', 'SynRandom', 'noIdea']

        cy.wrap(ranSynName).each((indx) => {

            // Clicking Slot Hinzufuegen
            cy.get('[data-cy="synonym-create"]')
                .click()

            cy.get('[data-cy="synonym-name"]')
                .click({force:true})
                .type(indx+String(x))

            // Click Anlegen
            cy.get('[data-cy="create-button"]')
                .click()
        })

        // Test Synonym Search Field
        cy.get('[data-cy="synonym-table-search"]')

        // Synonym Example Name
    }
}

// Exportint class frontEnd to End2End to test
export const onSynonym = new synonyms()