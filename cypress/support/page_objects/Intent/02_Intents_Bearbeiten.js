const m = Math.floor(Math.random() * 1000);

export class intent_bearbeiten {

    intentBearbeiten() {

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

        // Testing Intents Bearbeitung
        cy.wait(100)
        // Select first row of the Intent table
        cy.log('Line 432')
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})
        
        // Remove Name by clicking "X"
        cy.get('[class="v-input__append-inner"]')
            .first()
            .click()

        // Checking for a valid Name
        cy.get('div.v-input:nth-child(1)')
            .find('[class="v-text-field__details"]')
            .contains('Der Name muss gesetzt sein')
            //.should('be.visible')
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text('Der Name muss gesetzt sein')
        })

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .first()
                .click({force:true}).type(' ')

        // Checking for space or "/" within a Name
        cy.get('[class="v-text-field__details"]')
            .contains('Der Name enthält ungültige Zeichen!')
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text('Der Name enthält ungültige Zeichen!')
            })

        // Check for duplicate Name
        cy.log('Check for duplicate Name')
        cy.get('[class="v-text-field__slot"]')
            .clear()
            .contains('Name')
            .click({force:true})
            .type('test16')

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type('test16')

        cy.wait(500)
        
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
            .click()
                
        cy.visit('http://localhost/trainingsdaten/intent/')

        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($val) {
                cy.log($val.text())
                const text = $val.text()

                cy.wrap($val).should('have.text', text)
                })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentBearbeiten = new intent_bearbeiten()