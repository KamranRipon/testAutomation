import { capitalize } from "lodash"

const m = Math.floor(Math.random() * 1000);

export class frontEnd {

    titleOfThePage() {
        
        //Chaking title of the page
        cy.get('title').should('contain', 'CCI')
    }

    userInfo() {
        
        // Avatar
        cy.get('.v-avatar')
            .should('contain', 'CCI')

        // Asserting User Name
        cy.get('.v-navigation-drawer__content')
            .find('[class="col col-auto"]')
                .should('contain','User XY')
    }

    menuBar() {

        // clicking Start
        cy.get('[class="v-list-item__title ml-4"]')
            .contains('Start')
                .click()
        cy.wait(1000)

        cy.get('[class="v-list-item__title"]')
            .contains('Trainingsdaten')
                .click()

        // clicking Intents
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
        cy.wait(500)
        
        // clicking Entities
        cy.get('[data-cy=navDrawerEntities]')
            .contains('Entities')
                .click()
        cy.wait(500)

        // clicking Slots
        cy.get('[data-cy=navDrawerSlots]')
            .contains('Slots')
                .click()
        cy.wait(500)

        // Clicking Synonyms
        cy.get('[data-cy=navDrawerSynonyms]')
            .contains('Synonyms')
                .click()
        cy.wait(1000)

        // clicking Responses

        cy.get('[data-cy=navDrawerResponses]')
            .contains('Responses')
                .click()

        // Actions
        cy.get('[data-cy="navDrawerActions"]')
            .contains('Actions')
                .click()

        cy.wait(500)
    }

    intents() {

        // Expand Navigation Trainingsdaten
        cy.get('[class="v-list-item__title"]')
            .contains('Trainingsdaten')
                .click()

        // Intents area testing
        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
        cy.wait(500)
        
        // checking url after clicking Inten Button
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");

        ///* Intent Hinzufuegen testing *///
        
        // Clicking Intent Hinzufuegen
        cy.get('[data-cy="createIntentButton"]')
            .should('be.visible')
            .click()
        cy.wait(500)
        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/neu/");

        // Check Successfully saved
        const addValue = 'test-3'

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)
        
        cy.wait(1000)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.wait(1000)

        cy.get('[class="row align-center no-gutters"]')
            .find('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue +'" wurde erfolgreich gespeichert ')
        })
        
        cy.wait(500)

        // Back to intent
        cy.get('[class="v-list-item__content"]').contains('Intents').click()
        cy.wait(500)
        cy.get('[data-cy="createIntentButton"]')
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
        //.contains('Name')
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
        
        cy.wait(500)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()
                
        
        cy.wait(500)

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                .contains('Das Intent konnte nicht gespeichert werden.')
            
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Das Intent konnte nicht gespeichert werden. ')

                })
            //.should('be.visible')
            //.contains('Das Intent konnte nicht gespeichert werden.')
            //.should('eq', 'Das Intent konnte nicht gespeichert werden.')
            

        
        cy.get('[class="v-list-item__content"]').contains('Intents').click()
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "123test", "weather"]
        cy.wrap(textList).each((index) => {
            //cy.get('[type="text"]').type(index)
            //    cy.contains('i', 'send').click()

            cy.get('[data-cy="createIntentButton"]')
                //.should('be.visible')
                .click()
            cy.wait(1000)

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

            // cy.get('[href="/trainingsdaten/intent/"]').find('[class=""]')
            //     .contains('Intents').click()

            // cy.get('[data-cy=navDrawerIntents]')
            // .contains('Intents')
            //     .click()

            cy.wait(1000)

            cy.get('[class="v-list-item__content"]').contains('Intents').click()
            cy.wait(1000)
        })

        // cy.get('[class="v-radio mr-6 theme--light v-item--active"]')
            
        // cy.get('[role="radiogroup"]')
        //     .find('[value="yes"]')
        //         .click({force:true})
        
        // cy.get('.v-breadcrumbs__item')
        //     .contains('Intents')
        //         .click()
        
        ///* Search Option testing *///

        // Single Intent
        cy.get('[class="v-text-field__slot"]')
            .contains('Suchen').click({force:true})
                .type('weather')
        
        cy.get('tbody').find('[class="text-start"]').should('contain','weather')
        cy.wait(500)
        // Multiple Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
                .type('test')
        
        cy.get('tbody').find('[class="text-start"]').should('contain','test')

        // Nonexisting Intent
        cy.get('[class="v-text-field__slot"]')
            .clear().type('sky')
                
        cy.get('tbody').find('[class="v-data-table__empty-wrapper"]').should('contain',"")
        
    }

    Entities() {
        cy.get('[data-cy="navDrawerEntities"]')
            .contains('Entities')
                .click()

        cy.get('.v-text-field__slot')
            .contains('Suchen')
                .click({force:true})
                    .type('test')
    }

    mockingApi () {

        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
    }

    restApiTesting() {
        const item = {
            "id": 11,
            "name": "Example11",
            "description": ""
        }
        cy.request("http://localhost/cci-backend/intent")
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.not.be.null
            })

        cy.request({
            method:'POST',
            url: "/cci-backend/intent",

            body: {
                "id": 3,
                "name": "Example3",
                "description": ""
            }
        }).then((response) => {
            expect(response.body).has.property("description", "");
        })

        cy.request({
            method:'GET', 
            url: "/cci-backend/intent",
            body: {
                        "id":4,
                        "name": "example4",
                        "description": ""
                    }
        })
        
        cy.request("/cci-backend/intent")
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')

        cy.request({
            method:'POST',
            url: "/cci-backend/intent",

            body: {
                "id":1,
                "name": "Example1",
                "description": "Example1",
            }
        })

        cy.request('/cci-backend/intent')
            .its('body')
            .should('have.length', 6)
    }

    backEndTesting() {
        
        // get Response code
        cy.request({
            method: 'GET', 
            url: '/cci-backend/intent'
        }).then((response) => {
                expect(response.status).to.eq(200)
        })

        // POST and ASSERT Post
        cy.request({
            method:'POST',
            url: "/cci-backend/intent",

            body: {
                "id": m,
                "name": "test"+String(m),
                "description": "test"+String(m),
            }
        }).then(
                    (response) => {
                    //expect(response.body.id).to.eq(m)
                    expect(response.body).has.property('name', "test"+String(m));
                    expect(response.body).has.property('description', "test"+String(m));
            })
        let i = 2
        const j = i * 3
        cy.request('/cci-backend/intent')
            .its('body')
                .should('have.length', 7)
    }
}
// Exportint class frontEnd to End2End to test
export const onFrontend = new frontEnd()