// const t     = Math.floor(Math.random() * 5000);
const b     = Math.floor(Math.random() * 1000);
// const le    = Math.floor(Math.random() * 3500);
// const txa   = Math.floor(Math.random() * 4800);
// const txal  = Math.floor(Math.random() * 5800);
// const ei    = Math.floor(Math.random() * 3000);
// const eb    = Math.floor(Math.random() * 3500);
// const er    = Math.floor(Math.random() * 4000);
// const ea    = Math.floor(Math.random() * 4500);
const x     = Math.floor(Math.random() * 3500);
const xle   = Math.floor(Math.random() * 5500);
// const xTx   = Math.floor(Math.random() * 6500);
// const xTxLe = Math.floor(Math.random() * 7500);

const addValue = 'resBearbeitDmy'
export class responses_bearbeiten {

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
}
// Exportint class frontEnd to End2End to test
export const onResponseBearbeiten = new responses_bearbeiten()