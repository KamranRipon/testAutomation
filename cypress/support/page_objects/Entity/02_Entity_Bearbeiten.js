const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)

export class entity_bearbeiten {

    entityBearbeiten() {
        
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten').then((body) => {

            if (body.get('[class="v-list-group v-list-group--active primary--text"]')) {
                cy.log('If Statement True')
                // Clicking Intent
                cy.get('[data-cy="navDrawerEntities"]')
                    .contains('Entities')
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[tabindex="0"]')
                    .contains('Trainingsdaten')
                    .click()

                 // Clicking Intent
                cy.get('[data-cy="navDrawerEntities"]')
                    .contains('Entities')
                    .click()
            }
        })
        // Testing Intents Bearbeitung
       
        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        // Checking for a valid Name
        cy.get('div.v-input:nth-child(1)')
            .find('[class="v-text-field__details"]')
            .contains('Der Name muss gesetzt sein')
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text('Der Name muss gesetzt sein')
        })
        cy.get('[class="v-text-field__slot"]').clear()
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

        // Check for value Saved or Not
        cy.get('[class="v-text-field__slot"]')
            .clear()
            .contains('Name')
            .click({force:true})
            .type('test161')

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type('test161')
        
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})

        cy.get('tbody')
            .find('tr')
                .first()
            .find('td:nth-child(1)').then(function($val) {
                cy.log($val.text())
                const text = $val.text()

                cy.wrap($val).should('have.text', 'test161')
                })

        /* Check for successfully saved notification */
        // Select first row of the Intent table 
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        cy.get('[class="v-text-field__slot"]')
        .contains('Name')
        .click({force:true})
        .wait(200)
        .type(addValue+String(m))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(m))

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
        cy.log('Im here')
        // Saved Notification Must appear after successfully saved
        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Entity "test161" wurde erfolgreich gespeichert ')
        })
        /* Check for  known or duplicate value in the table */
        // Select first row of the Intent table 
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})
        
        cy.log('Clear')
        cy.get('[class="v-input__append-inner"]')
            .first()
                .click()

        cy.get('[class="v-text-field__slot"]')
            .clear()
            .contains('Name')
            .click({force:true})
            .type('test1')

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type('test1')

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
        cy.wait(500)
        // Saved Notification Must appear after successfully saved
        if (cy.get('[class="alert error white--text"]')) {
            cy.log('If Statement True')
            cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageBody"]')
            .then((errorMsg) => {
                expect(errorMsg).to.have.text(' Es exisitiert bereits ein Entity mit diesem Namen ')
        })
        }
        else {
            cy.log('If Statement False')
        }
        
        cy.wait(1500)
        cy.get('[class="v-input__append-inner"]')
        .first()
        .click()
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type('test-infi')

        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
            .click({force:true})
    }
}
// Exportint class frontEnd to End2End to test
export const onEntityBearbeiten = new entity_bearbeiten()