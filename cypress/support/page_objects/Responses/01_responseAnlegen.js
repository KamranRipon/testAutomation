const t     = Math.floor(Math.random() * 5000);
// const b     = Math.floor(Math.random() * 1000);
// const le    = Math.floor(Math.random() * 3500);
// const txa   = Math.floor(Math.random() * 4800);
// const txal  = Math.floor(Math.random() * 5800);
// const ei    = Math.floor(Math.random() * 3000);
// const eb    = Math.floor(Math.random() * 3500);
// const er    = Math.floor(Math.random() * 4000);
// const ea    = Math.floor(Math.random() * 4500);
// const x     = Math.floor(Math.random() * 3500);
// const xle   = Math.floor(Math.random() * 5500);
// const xTx   = Math.floor(Math.random() * 6500);
// const xTxLe = Math.floor(Math.random() * 7500);

const addValue = 'resAnlegDummy'

export class responses_anlegen {

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
            .get('[data-cy="response-create"]')
            .click({force:true})

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/response/neu/");
        
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
        cy.log('Line 118')
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
}
// Exportint class frontEnd to End2End to test
export const onResponseAnlegen = new responses_anlegen()