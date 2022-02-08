const t     = Math.floor(Math.random() * 5000);
const Resb     = Math.floor(Math.random() * 6500);
const Resbdub     = Math.floor(Math.random() * 2500);
const Resble    = Math.floor(Math.random() * 3500);

const addValue = 'ResButbeDmyVal'

export class button_bearbeiten {

    buttonBearbeiten() {
        /* G. Response Button Bearbeiten Testing */
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
        
        //Enter to a row of Response Table which contain highest no. of text
        var max_val2 = 0
        // Enter to Response table Row
        cy.log('Line 57')
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')
                                                                
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                    if(Number(sp_vall2[num2]) > max_val2) {
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
        var resbutName
        // Save Response Name to a variable for letar Assertion
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name')
      
        cy.get('@name').then((name) => {
            cy.log(name) //prints name
            resbutName = name
            cy.log(resbutName)
        })

        // Locate Button Tab and enter to it
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Buttons')
            .click()
            .wait(300)  

        // Entering to last row of Button table
        cy.log('Line 89')
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // clear response name
        cy.get('[data-cy="responsebutton-title"]')
            .clear()

        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Titel muss gesetzt sein')

        // add a space or '/' to input field /* Currently Bug, cannot be tested */

        // const space   = [' ', '/']
        
        // cy.wrap(space).each((index) => {

        //     cy.get('[data-cy="responsebutton-title"]')
        //     .click({force:true})
        //     .type(index)

        //     //Assert warning notification
        //     cy.get('[class="v-messages__wrapper"]')
        //         .should('have.text','Der Name enthält ungültige Zeichen!')

        //     // Remove space or '/'
        //     cy.get('[data-cy="responsebutton-title"]')
        //         .click({force:true})
        //         .clear()
        // })

        // 1. Try to save without response-button-title but with intent
        cy.get('[data-cy="save-button"]')
            .click()
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()
        
        // 2. Try to save with valid response-button-title but without intent
        cy.get('[data-cy="responsebutton-title"]')
            .type(addValue+String(Resb))
        
        cy.get('[class="v-input__icon v-input__icon--clear"]').eq(1)
            .click()

        //2.1 Assert warning notification Intent
        cy.get('[class="v-messages__wrapper"]').eq(1)
            .should('have.text','Ein Intent muss ausgewählt sein')

        cy.get('[data-cy="save-button"]')
            .click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resb))

        // Add an Intent 
        cy.get('[class="v-select__slot"]')
            .contains('Intent')
            .click({force:true})
            .get('[class="v-list v-select-list v-sheet theme--light theme--light"]')
            .find('[role="option"]')
            .last()
            .click()

        // Click Speichern
        cy.get('[data-cy="save-button"]')
            .click()
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Der Response Button "'+addValue+String(Resb)+'"  wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[data-cy="success-remove"]')
            .click()
        cy.log('Line 181')

        // return to Response
        // cy.get('[data-cy="navDrawerResponses"]')
        //     .click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="responsebutton-table-search"]')
            .click()
            .type(addValue+String(Resb))
        

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert Value in Response Table
        cy.log('Line 203')
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(2)')
            .contains(addValue+String(Resb))
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(Resb))
            })

        // clear search field
        cy.get('[data-cy="responsebutton-table-search"]')
            .click()
            .clear()

        // 2. Check for duplicate name
        // 2.1 Response-button-title
        // 2.1.1 Error message after unsuccessful saving
        // 2.1.2 Valaue should be double in the Response table, assert response Table

        // At first add a New value to Response-button-title Name
        cy.log('Line 224')
        cy.get('[data-cy="responsebutton-create"]')
            .click()

        // Add a valid Button Title
        cy.get('[data-cy="responsebutton-title"]')
            .click()
            .type(addValue+String(Resbdub))
            
        // Add an Intent 
        cy.log('Line 236')
        cy.get('[class="v-select__slot"]')
            .contains('Intent')
            .click({force:true})
            .get('[class="v-list v-select-list v-sheet theme--light theme--light"]')
            .find('[role="option"]')
            .last()
            .click()

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving

        // edit a button-title and try to save with an existing title
        cy.log('Line 254')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        // Clear and add a title
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resbdub))

        //Try to save the changes
        cy.get('[data-cy="save-button"]')
            .click()
        
        // Assert Error Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]')
            .click()

        // Abort editing
        cy.get('[data-cy="abort-button"]')
            .click()
        
        // 2. Check for duplicate name
        // 2.1 Response-button-title
        //     2.1.2 Valaue should not be double in the Response table, assert response Table

        cy.get('[data-cy="responsebutton-table-search"]')
            .click()
            .type(addValue+String(Resbdub))
        
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .contains(addValue+String(Resbdub))
            .then(function(checkDublicate) {
                cy.wrap(checkDublicate).should('have.length', 1)
            })

        // clear search field
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.log('Line 302')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response-name
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resble))

        cy.get('[class="v-breadcrumbs__item"]')
            .contains(' Response Buttons ')
            .click()
            .wait(300)

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Der Response Button'+' "'+addValue+String(Resble)+'" '+ ' wurde erfolgreich gespeichert ')
        
        // Remove "success-remove"
        cy.get('[data-cy="success-remove"]')
            .click()

        // Assert saved data in response table
        // response-table-search
        cy.get('[data-cy="responsebutton-table-search"]')
            .click()
            .type(addValue+String(Resble))

        // Selecting Entire Table
        cy.get('[class="v-select__slot"]').click()
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
            .click({force:true})
            
        // Assert Value in Response Table
        cy.log('Line 330')
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(2)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(Resble))
            })

        // Clear response-table-search
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data
        cy.log('Line 345')
        // entering to first row of response-button-table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Clear response-name
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type('randomResponseName')

        cy.get('[data-cy="abort-button"]')
            .click()

        // Assert Response Table
        cy.get('[data-cy="responsebutton-table-search"]')
            .click()
            .type('randomResponseName')
        
        cy.log('Line 365')
        cy.get('tbody')
            .find('tr')
            //.find('td:nth-child(2)')
            .should('not.have.text', 'randomResponseName')

        // clear response-table-search
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesButtonBearbeiten = new button_bearbeiten()