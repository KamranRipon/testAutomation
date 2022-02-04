// const t     = Math.floor(Math.random() * 5000);
// const b     = Math.floor(Math.random() * 1000);
// const le    = Math.floor(Math.random() * 3500);
const txa   = Math.floor(Math.random() * 4800);
// const txal  = Math.floor(Math.random() * 5800);
// const ei    = Math.floor(Math.random() * 3000);
// const eb    = Math.floor(Math.random() * 3500);
// const er    = Math.floor(Math.random() * 4000);
// const ea    = Math.floor(Math.random() * 4500);
// const x     = Math.floor(Math.random() * 3500);
// const xle   = Math.floor(Math.random() * 5500);
// const xTx   = Math.floor(Math.random() * 6500);
// const xTxLe = Math.floor(Math.random() * 7500);

const addValue = 'TextAnDmy'

export class response_text_anlegen {

    responseTexteAnlegen() {

        /* Response Text Anlegen Testing */

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
}

// Exportint class frontEnd to End2End to test
export const onResponsesTextAnlegen = new response_text_anlegen()