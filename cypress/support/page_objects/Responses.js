import { capitalize, find, first, values } from "lodash"

const t = Math.floor(Math.random() * 5000);
const b = Math.floor(Math.random() * 1000);
const le = Math.floor(Math.random() * 3500);
const txa = Math.floor(Math.random() * 4800);
const txal = Math.floor(Math.random() * 5800);
const ei = Math.floor(Math.random() * 3000);
const eb = Math.floor(Math.random() * 3500);
const er = Math.floor(Math.random() * 4000);
const ea = Math.floor(Math.random() * 4500);
const x = Math.floor(Math.random() * 3500);
const xle = Math.floor(Math.random() * 5500);
const xTx = Math.floor(Math.random() * 6500);
const xTxLe = Math.floor(Math.random() * 7500);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample'

export class responses {

    responseAnlegen() {

        /* Response Anlegen Testing */

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
            })

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://localhost/trainingsdaten/response/");

        // Clicking Response Anlegen
        cy.get('[data-cy="response-create"]')
            .should('have.attr', 'href')
            .then(($href) => {
                   cy.visit($href)
                        })

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/response/neu/");

        /*
        A. Response Anlegen 

        1. Name should not be empty, error message should contain "Name"
            1.1 Response
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving 
        2. Check for duplicate name
            2.1 Response
                2.1.1 Error message after unsuccessful saving 
                2.1.2 Valaue should be in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must not be saved
        */
        
        // 1. Name should not be empty, error message should contain "Name"
        //    1.1 Response
        //        1.1.1 Warning message below input field

        cy.get('[data-cy="response-name"]')
            .click({force:true})
        
        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')

        // add a space or '/' to input field

        const space   = [' ', '/']
        
        cy.wrap(space).each((index) => {

            cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type(index)

            //Assert warning notification
            cy.get('[class="v-messages__wrapper"]')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="response-name"]')
                .click({force:true})
                .clear()
        })
    
        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()
        
        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        
        // Add a response name with valid name and assert notification & Assert in Response table
        cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type(addValue+String(t))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Response'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()
        cy.log('Line 137')

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]')
            .click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table
        cy.log('Line 145')
        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(t))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert Value in Response Table
        cy.log('Line 159')
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                
                cy.wrap($synName1).should('have.text', addValue+String(t))
            })

        // clear search field
        cy.get('[data-cy="response-table-search"]')
            .click()
            .clear()
        
        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.1 Error message after unsuccessful saving 
        cy.log('Line 177')

        cy.get('[data-cy="response-create"]')
            .click()

        cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type(addValue+String(t))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.2 Valaue should be in the Response table, assert response Table
        cy.log('Line 200')
        // return to Response
        cy.get('[data-cy="navDrawerResponses"]')
            .click()

        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(t))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Assert table length in Response Table
        cy.log('Line 217')
        cy.get('tbody')
            .find('tr')
            .then(function($synName2) {
                const resTbLen = $synName2.length
                cy.log(resTbLen)
                
                cy.wrap($synName2).should('have.length', resTbLen)
            })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.log('Line 228')
        cy.get('[data-cy="navDrawerResponses"]').click()

        cy.get('[data-cy="response-create"]')
            .click({force:true})

        cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type('someName')

        cy.get('[data-cy="navDrawerResponses"]')
            .click()

        cy.get('[data-cy="response-table-search"]')
            .click()
            .type('someName')

        // Select Entire Synonym Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.get('[data-cy="response-table-search"]')
            .clear()
    }

    responseBearbeiten() { 
        
        /* 
        B. Response Bearbeiten

        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Response Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving
        2. Check for duplicate name
            2.1 Response Name
                2.1.1 Error message after unsuccessful saving
                2.1.2 Valaue should be double in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */

        /* Response Anlegen Testing */

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
            })

        // 1. Edit Name should not be empty, error message should contain "Name"
        // 1.1 Response Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        // Entering to first of
        cy.log('Line 312')
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response name
        cy.get('[data-cy="response-name"]')
            .clear()

        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')

        // add a space or '/' to input field

        const space   = [' ', '/']
        
        cy.wrap(space).each((index) => {

            cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type(index)

            //Assert warning notification
            cy.get('[class="v-messages__wrapper"]')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="response-name"]')
                .click({force:true})
                .clear()
        })
    
        // Click speichen
        cy.get('[data-cy="save-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        
        // Add a response name with valid name and assert notification & Assert in Response table
        cy.get('[data-cy="response-name"]')
            .click({force:true})
            .type(addValue+String(b))

        // Click Speichern
        cy.get('[data-cy="save-button"]')
            .click()
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Response'+' "'+addValue+String(b)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()
        cy.log('Line 377')

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]')
            .click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(b))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert Value in Response Table
        cy.log('Line 398')
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            .contains(addValue+String(b))
            .then(function($synName1) {
                
                cy.wrap($synName1).should('have.text', addValue+String(b))
            })

        // clear search field
        cy.get('[data-cy="response-table-search"]')
            .click()
            .clear()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving
        // 2.1.2 Valaue should be double in the Response table, assert response Table

        // At first add a New value to Response Name
        cy.log('Line 421')
        cy.get('[data-cy="response-create"]')
            .click()

        cy.get('[data-cy="response-name"]')
            .click()
            .type(addValue+String(x))

        cy.get('[data-cy="create-button"]')
            .click()

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]')
            .click()

        // Remove success notification
        cy.get('[data-cy="success-remove"]')
            .click()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving
        
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(b))
        
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(b))
            .click()

        cy.get('[data-cy="response-name"]')
            .clear()
            .type(addValue+String(x))

        cy.get('[data-cy="save-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.2 Valaue should be in the Response table, assert response Table

        // return to Response
        cy.get('[data-cy="abort-button"]')
            .click()

        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(x))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Assert table length in Response Table
        cy.log('Line 487')
        cy.get('tbody')
            .find('tr')
            .contains(addValue+String(x))
            .then(function($synName3) {
                const resTbLen3 = $synName3.length
                cy.log(resTbLen3)
                
                cy.wrap($synName3).should('have.length', resTbLen3)
            })
        
        // Clear response-table-search
        cy.get('[data-cy="response-table-search"]')
            .clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.log('Line 503')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response-name
        cy.get('[data-cy="response-name"]')
            .clear()
            .type(addValue+String(xle))

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Responses')
            .click()
            .wait(500)

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Response'+' "'+addValue+String(xle)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type(addValue+String(xle))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert Value in Response Table
        cy.log('Line 537')
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            //.contains(addValue+String(xle))
            .then(function($synName1) {
                
                cy.wrap($synName1).should('have.text', addValue+String(xle))
            })

        // Clear response-table-search
        cy.get('[data-cy="response-table-search"]')
            .clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data
        cy.log('Line 553')
        
        // entering to first row of response table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Clear response-name
        cy.get('[data-cy="response-name"]')
            .clear()
            .type('randomResponseName')

        cy.get('[data-cy="abort-button"]')
            .click()

        // Assert Response Table
        cy.get('[data-cy="response-table-search"]')
            .click()
            .type('randomResponseName')
        
        cy.log('Line 575')
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'randomResponseName')

        // clear response-table-search
        cy.get('[data-cy="response-table-search"]')
            .clear()
    }

    responseTexteAnlegen() {

        /* 
        C. Response Text Anlegen

        1. Text Name should not be empty, error message should contain "Name"; /Currently Bug/
            1.1 Response Teste Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving  /Currently Bug/
        2. Check for successfully saved values
            3.1 Assert successfully saved Notification
            3.2 Assert in the Texte table
        3. Saving saves given data correctly
        4. Leave site via menu or breadcrump does not save value
        */

        /* Response Anlegen Testing */

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
            })

        // 1. Text Name should not be empty, error message should contain "Texte"; /Currently Bug/
        // 1.1 Response Teste Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving  /Currently Bug/

        //Enter to first row of Response Table
        cy.log('Line 631')
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            .wait(500)

        var resName

        // Save Response Name for letar Assertion
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name')
                    
        cy.get('@name').then((name) => {
          cy.log(name) //prints name
          resName = name
          cy.log(resName)
        })
        
        // Entering to Texte Tab
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Texte')
            .click()

        // Clicking responsetext-create
        cy.get('[data-cy="responsetext-create"]')
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .click({force:true})
        
        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        // Clicking Anlegen Button while Text field is empty
        // Click speichen
        cy.get('[data-cy="create-button"]')
            .click()

        // success-remove
        cy.get('[data-cy="success-remove"]')
            .click()
        
        // Assert Nicht Möglich, /Currently Known as But/
        // cy.get('[data-cy="errorMessageTitle"]')
        //     .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        // Close Error Notification
        // cy.get('[data-cy="error-remove"]')
        //     .click()

        // Add a valid Text Name
        cy.get('[data-cy="responsetext-create"]')
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .click({force:true})
            .type(addValue+String(txa))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // 2. Check for successfully saved values
        // 2.1 Assert successfully saved Notification

        // Assert Successfully Saved Notification
        var idNr
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()
                cy.log('idNr')
                cy.log(idNr)

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Der Response Text'+String(idNr)+'wurde erfolgreich gespeichert ')
            })
        
        // 2. Check for successfully saved values
        // 2.2 Assert in the Texte table

        // Assert in Response Texte Table
        cy.log('Line 735')
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {

                const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(txa))
            })
        // 3. Saving saves given data correctly
        cy.get('tbody')
            .find('tr')
            .then((tbLength) => {
                const countRow = tbLength.length
                
                cy.get('[data-cy="navDrawerResponses"]')
                    .click()
                
                cy.get('[data-cy="response-table-search"]')
                    .click()
                    .type(resName)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .should('have.text',' '+String(countRow)+' ')
            })
                    
        // 4. Leave site via menu or breadcrump does not save value
        cy.log('Line 756')
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        // Entering to Texte Tab
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Texte')
            .click()

        // Clicking responsetext-create
        cy.get('[data-cy="responsetext-create"]')
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .click({force:true})
            .type('leaveWithBreadCrumb')
        
        // Leave Site via Bread Crumb
        cy.get('[class="v-breadcrumbs theme--light"]')
            .contains(' Response Text ')
            .click()
        
        // Assert data in Texte Table
        // cy.get('[data-cy="responsetext-table-search"]')
        //     .click()
        //     .type('leaveWithBreadCrumb')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
        
        cy.log('Line 792')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(2)')
            .should('not.have.text','leaveWithBreadCrumb')        
    }

    responseTexteBearbeiten() {

        /* 
        D. Response Text Bearbeiten

        1. Edit Name should not be empty, error message should contain "Text"
            1.1 Response Name
                1.1.1 alert message below input field
                1.1.2 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */

        /* Response Texte Bearbeiten Testing */

        cy.get('[class="v-list-group"]')
            .contains('Trainingsdaten')
            .then((Tdaten) => {
                
                if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                    cy.log('If Statement True')

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
                else {
                    cy.log('If Statement False')

                    cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                        .contains('Trainingsdaten')
                        .click()

                    cy.get('[data-cy="navDrawerResponses"]')
                        .click()
                }
            })

        // 1. Edit Name should not be empty, error message should contain "Text"
        // 1.1 Response Texte Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        // Entering to first of
        cy.log('Line 849')
        cy.wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
        
        var max_val2 = 0
        // Enter to intent table Row
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()

                var sp_vall2 = vall2.split(" ")
                
                //var max_val2 = 0
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
        
        // Save Response Name for letar Assertion
        var resName1
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name1')
                    
        cy.get('@name1').then((name1) => {
            cy.log(name1) //prints name
            resName1 = name1
            cy.log(resName1)
        })    

        // Entering to Texte Tab
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Texte')
            .click()
            .wait(500)

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Entering to a Texte Table Row
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .last()
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .click({force:true})
            .clear()
        
        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        // Clicking Anlegen Button while Text field is empty
        // Click speichen
        cy.get('[data-cy="save-button"]')
            .click()
        
        // Assert Nicht Möglich,
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Response konnte nicht gespeichert werden. ')

        //Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // add a valid text name and assert
        //  1. notification
        //  2. in the table

        cy.get('[data-cy="responsetext-text"]')
            .click({force:true})
            .type(addValue+String(xTx))

        // click save-button
        cy.get('[data-cy="save-button"]')
            .click()

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // Assert Successfully Saved Notification
        cy.log('Line 942')
        var idNr2
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr2) {
                idNr2 = $tbIdNr2.text()
                cy.log('idNr')
                cy.log(idNr2)

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Der Response Text'+String(idNr2)+'wurde erfolgreich gespeichert ')
            })

        // Remove success notification
        cy.get('[data-cy="success-remove"]')
            .click()
        
        // 2. Check for successfully saved values
        // 2.2 Assert in the Texte table

        // Assert in Response Texte Table
        cy.log('Line 962')
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {

                const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(xTx))
            })

        // 3. Saving saves given data correctly
        cy.log('Line 990')
        cy.get('tbody')
            .find('tr')
            .then((tbLength) => {
                const countRow = tbLength.length
                
                cy.get('[data-cy="navDrawerResponses"]')
                    .click()
                
                cy.get('[data-cy="response-table-search"]')
                    .click()
                    .type(resName1)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .should('have.text',' '+String(countRow)+' ')
            })
        
        // clear resonse-table-search
        cy.get('[data-cy="response-table-search"]')
            .clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.log('Line 1015')
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            .find('td:nth-child(1)').then((responName) => {

                cy.get('[data-cy="response-table-search"]')
                    .click()
                    .type(resName1)
                    .get('tbody')
                    .find('tr')
                    .last()
                    .click()
            })

        // Entering to Texte Tab
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Texte')
            .click()

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // enter to a Texte Row
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // responsetext-text
        cy.get('[data-cy="responsetext-text"]')
            .click()
            .clear()
            .type(addValue+String(xTxLe))

        // leave site by clicken bread crumb
        // Entering to Texte Tab
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Response Text')
            .click()

        // Assert value in Texte table
        cy.get('[data-cy="responsetext-table-search"]')
            .click()
            .type(addValue+String(xTxLe))
        
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(2)')
            .should('have.text', addValue+String(xTxLe))

        // clear resonse-table-search
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data

        cy.log('Line 1076')

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})

        // enter to a Texte Row
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // responsetext-text
        cy.get('[data-cy="responsetext-text"]')
            .click()
            .clear()
            .type('responseTextName')

        // leave site by clicken abbrechen
        cy.get('[data-cy="abort-button"]')
            .click()

        // Assert value in Texte table
        cy.get('[data-cy="responsetext-table-search"]')
            .click()
            .type('responseTextName')
        
        cy.log('Line 1105')
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'responseTextName')

        // clear response-table-search
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()

    }
}

// Exportint class frontEnd to End2End to test
export const onResponses = new responses()