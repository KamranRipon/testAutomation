const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+ String(m)

export class intent_hinzufuegen {
        
    intentsHinzufuegen() {

        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
            .click()

        // Intents area testing
        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
        
        // checking url after clicking Inten Button
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");

        ///* Intent Hinzufuegen testing *///
        // Clicking Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .should('be.visible')
            .click()
        
        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/neu/");

        // Check Successfully saved
        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue +'" wurde erfolgreich gespeichert ')
        })

        // Back to intent
        cy.get('[class="v-list-item__content"]').contains('Intents').click()
        cy.wait(500)
        cy.get('[data-cy="intent-create"]')
            //.should('be.visible')
            .click()

        // Checking for a valid Name
        cy.get('[class="v-input pb-6 v-input--has-state theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined error--text"]')
        .find('[class="v-text-field__details"]')
        .contains('Der Name muss gesetzt sein')
        .should('be.visible')

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
                .click({force:true})
        
        cy.get('[class="v-text-field__details"]')
            .contains('Der Name muss gesetzt sein')
            .should('be.visible')

        // Checking for space or "/" within a Name
        cy.get('[class="v-label v-label--active theme--light error--text"]')
        .should('be.visible')
            .type(' ')

        cy.get('[class="v-text-field__details"]')
            .contains('Der Name enthält ungültige Zeichen!')
            .should('be.visible')
        
        // Checking for Duplicate Name: Name cannot be known in Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
            //class="v-label theme--light error--text"

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                .contains('Das Intent konnte nicht gespeichert werden.')
            
                .then((errorMsg) => {
                    cy.wait(300)
                    expect(errorMsg).to.have.text(' Das Intent konnte nicht gespeichert werden. ')

                })
        
        cy.get('[class="v-list-item__content"]').contains('Intents').click({force:true})
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="intent-create"]')
                .click()

            cy.get('[class="v-text-field__slot"]')
            .contains('Name')
                .click({force:true})

            cy.get('[class="v-label v-label--active theme--light error--text"]')
            .should('be.visible')
                .type(index)

            cy.get('[class="v-label theme--light"]')
                .contains('Beschreibung')
                    .click({force:true})
                    
            cy.get('[class="v-label v-label--active theme--light primary--text"]')
                .should('be.visible')
                    .type(index)

            // Checking Radio Button
            cy.get('[role="radiogroup"]')
                .find('[value="no"]')
                    .click({force:true})

            cy.get('[role="radiogroup"]')
                .find('[value="no"]')
                    .should('be.checked')

            cy.get('[role="radiogroup"]')
                .find('[value="yes"]')
                    .click({force:true})

            cy.get('[role="radiogroup"]')
                .find('[value="yes"]')
                    .should('be.checked')
                    
            cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                    .should('be.visible')
                        .click()

            cy.wait(500) // this wait is important
            cy.get('[class="v-list-item__content"]').contains('Intents').click()

            cy.wait(200)
        })
        cy.visit('/')
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentHinzufuegen = new intent_hinzufuegen()