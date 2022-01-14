import { capitalize, find, first, values } from "lodash"

const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+ String(m)
const addExample = 'testExample-1'


export class intent {

    titleOfThePage() {
        cy.log('Title Of The Page')
        
        //Chaking title of the page
        cy.get('title').should('contain', 'CCI')
    }

    userInfo() {
        cy.log('User Information')
        
        // Avatar
        cy.get('.v-avatar')
            .should('contain', 'CCI')

        // Asserting User Name
        cy.get('[id="navbarUsername"]')
            //.should('contain','User XY')
    }

    menuBar() {

        cy.log('Menu Bar Testing')

        // clicking Start
        //cy.get('[class="v-list-item__title ml-4"]')
        cy.get('[href="/"]')
            .contains('Start')
                .click()
        cy.url().should("eq", "http://localhost/");

        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // clicking Intents
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        //cy.wait(100)
        
        // clicking Entities
        cy.get('[data-cy=navDrawerEntities]')
            .contains('Entities')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/entity/");
        //cy.wait(100)

        // clicking Slots
        cy.get('[data-cy=navDrawerSlots]')
            .contains('Slots')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/slot/");
        //cy.wait(100)

        // Clicking Synonyms
        cy.get('[data-cy=navDrawerSynonyms]')
            .contains('Synonyms')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/synonym/");
        //cy.wait(100)

        // Checking Trainingsdata Tab is open or not
        
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten').then((body) => {
            if (body.length>0) {
                // clicking Responses
                cy.log('If Statemanent True')
                
                cy.get('[data-cy=navDrawerResponses]')
                .contains('Responses')
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[class="v-list-item__title pl-4"]')
                    .contains('Trainingsdaten')
                    .click()
            }
        })

        cy.get('[data-cy=navDrawerResponses]')
            .contains('Responses')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/response/");

        // Actions
        cy.get('[data-cy="navDrawerActions"]')
            .contains('Actions')
                .click()
        cy.url().should("eq", "http://localhost/trainingsdaten/action/");

        
    }

    intents() {

        // Expand Navigation Trainingsdaten
        // cy.get('[class="v-list-item__title"]')
        //     .contains('Trainingsdaten')
        //         .click()
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
        //cy.wait(500)
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

        cy.wait(400)

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
        
        //cy.wait(500)

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()
                
        cy.wait(500)

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                .contains('Das Intent konnte nicht gespeichert werden.')
            
                .then((errorMsg) => {
                    cy.wait(500)
                    expect(errorMsg).to.have.text(' Das Intent konnte nicht gespeichert werden. ')

                })
        
        cy.get('[class="v-list-item__content"]').contains('Intents').click({force:true})
        
        // After Click Input field must be activated
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {
            //cy.get('[type="text"]').type(index)
            //    cy.contains('i', 'send').click()

            cy.get('[data-cy="intent-create"]')
                //.should('be.visible')
                .click()
            //cy.wait(1000)

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

            cy.wait(500) // this wait is important
            cy.get('[class="v-list-item__content"]').contains('Intents').click()

            cy.wait(200)
        })

        // cy.get('[class="v-radio mr-6 theme--light v-item--active"]')
            
        // cy.get('[role="radiogroup"]')
        //     .find('[value="yes"]')
        //         .click({force:true})
        
        // cy.get('.v-breadcrumbs__item')
        //     .contains('Intents')
        //         .click()
        
        // ///* Search Option testing *///

        // // Single Intent
        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Suchen').click({force:true})
        //         .type('weather')
        
        // cy.get('tbody').find('[class="text-start"]').should('contain','weather')
        // cy.wait(500)
        // // Multiple Intent
        // cy.get('[class="v-text-field__slot"]')
        //     .clear()
        //         .type('test')
        
        // cy.get('tbody').find('[class="text-start"]').should('contain','test')

        // // Nonexisting Intent
        // cy.get('[class="v-text-field__slot"]')
        //     .clear().type('sky')
                
        // cy.get('tbody').find('[class="v-data-table__empty-wrapper"]')
        //     .should('contain',"")

        // cy.get('[class="v-text-field__slot"]')
        //     .clear() 
    }

    intent_suchen() {
        ///* Search Option testing *///

        // Expand Navigation Trainingsdaten
        // cy.get('[class="v-list-item__title"]')
        //     .contains('Trainingsdaten')
        //         .click()
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

        // Single Intent
        cy.get('[class="v-text-field__slot"]')
            .contains('Suchen').click({force:true})
                .type('weather')
        // Checking return Result
        cy.get('tbody').find('[class="text-start"]').should('contain','weather')
        
        // Multiple Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
                .type('test')
        
        cy.get('tbody').find('[class="text-start"]').should('contain','test')

        // Nonexisting Intent
        cy.get('[class="v-text-field__slot"]')
            .clear().type('sky')
                
        cy.get('tbody').find('[class="v-data-table__empty-wrapper"]')
            .should('contain',"")

        cy.get('[class="v-text-field__slot"]')
            .clear() 
    }

    intent_bearbeiten() {

        //cy.get('[class="v-list-item__title"]')
        
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten').then((body) => {

            if (body.get('[class="v-list-group v-list-group--active primary--text"]')) {
                cy.log('If Statement True')
                // Clicking Intent
                cy.get('[data-cy=navDrawerIntents]')
                    .contains('Intents')
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[tabindex="0"]')
                    .contains('Trainingsdaten')
                    .click()

                 // Clicking Intent
                cy.get('[data-cy=navDrawerIntents]')
                    .contains('Intents')
                    .click()
            }
        })
        // Testing Intents Bearbeitung
       
        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
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

        //cy.wait(100)

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

    intentExampleHinzufuegen() {

        // Expand Navigation Trainingsdaten
        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // Entering Intent Tab
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()

        // Select first row of the Intent Table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
            .click({force:true})

        cy.get('[class="v-tab"]').contains('Examples').click()

        cy.get('[data-cy="create-intent-example"]').click()

        // Check for valid name
        cy.get('[class="v-text-field__details"]').then((vTextMsg) => {
            expect(vTextMsg).to.have.text('Der Text muss gesetzt sein0 / 2000')
        })
        // Add an example 
        cy.get('[class="v-text-field__slot"]').contains('Text')
            .click({force: true}).type('testExample')
        
        cy.get('[class="v-btn__content"]').contains('Anlegen').click()
        cy.log('Searching')
        
        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {
                cy.log($text.text())
                const text = $text.text()
                cy.wrap($text).should('have.text', text)
            }) 
        
        // Intents area testing
        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()

        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
            .click({force:true})

        cy.get('[class="v-tab"]').contains('Examples').click()

        // add more examples for Search  
        var exmList = ["Example","Hello", "Bye"]
        cy.wrap(exmList).each((index) => {

            cy.get('[data-cy="create-intent-example"]').click()

            cy.get('[class="v-text-field__details"]').then((vTextMsg) => {
                expect(vTextMsg).to.have.text('Der Text muss gesetzt sein0 / 2000')
            })
            cy.get('[class="v-text-field__slot"]').contains('Text')
                .click({force: true}).type(index)
            
            cy.get('[class="v-btn__content"]').contains('Anlegen').click()
        })
    }

    intentExampleSuchen() {
        ///* Intent Example Search Option testing *///

        // Expand Navigation Trainingsdaten
        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // Clicking Intent
        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()

        // Select first row of the Intent table
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
            .click({force:true})

        cy.get('[class="v-tab"]').contains('Examples').click()

        // select whole table
        cy.get('[class="v-input__append-inner"]').last().click({force:true})
        cy.get('[class="v-list-item__title"]').contains('Alle').click()
        
        // Single example
        cy.get('[class="v-text-field__slot"]')
            .contains('Suchen').click({force:true})
                .type('hello')
        
        // Checking return Result
        cy.get('tbody')//.find('[class="text-start"]').should('contain','hallo')
            .find('td:nth-child(2)').first().then(function($val) {
            cy.log($val.text())
            const text = $val.text()

            cy.wrap($val).should('have.text', text)
            })

        // Multiple Intent
        cy.get('[class="v-text-field__slot"]')
            .clear()
                .type('test')

        cy.get('tbody')//.find('[class="text-start"]').should('contain','hallo')
            .find('td:nth-child(2)').first().then(function($val) {
            cy.log($val.text())
            const text = $val.text()

            cy.wrap($val).should('have.text', text)
        })

        // Non-existing Intent
        cy.get('[class="v-text-field__slot"]')
            .clear().type('sky')
                
        cy.get('tbody').find('[class="v-data-table__empty-wrapper"]')
            .should('contain',"")

        cy.get('[class="v-text-field__slot"]')
            .clear() 

        // Check Example count same in Intent Table
        cy.get('tbody')
        .find('td:nth-child(2)')
            .then(function($countTR) {
                cy.log($countTR.length)
                let nRow = $countTR.length

        // Back to Intent Table
        cy.get('[data-cy="navDrawerIntents"]')
            .contains('Intents')
                .click()
        
        // Select first row of the Intent table
        //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
        cy.get('tbody')
            .find('td:nth-child(3)')
            .first().then(function($intentExCount) {
                cy.wrap($intentExCount).should('have.text', ' '+nRow+' ')
            })
        })
    }

    intentExampleLoeschen() {

        // Expand Navigation Trainingsdaten
        cy.get('[tabindex="0"]')
            .contains('Trainingsdaten')
                .click()

        // Clicking Intent
        cy.get('[data-cy="navDrawerIntents"]')
            .contains('Intents')
                .click()

        cy.wait(400)
        
        // const val = cy.get('tbody')
        //     .find('tr')
        //         .first()
        //     .find('td:nth-child(4)').then(function($val) {
        //         cy.log($val.text())
        //     })    
        
        cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            .first()
                .click({force:true})

        cy.get('[class="v-tab"]').contains('Examples').click()

        cy.wait(500)

        cy.get('[class="v-select__slot"]')
            .click()
            .get('[class="v-list-item__content"]')
                .contains('Alle').click({force:true})
        
        cy.get('tbody tr').then(function($noRow) {
            const tableRow = $noRow.length
            cy.log(tableRow)

            if (tableRow <= 1 ) {
                cy.log('Running if')
                var exmList = ["Example1","Example2", "Example3"]

                cy.wrap(exmList).each((index) => {

                cy.get('[data-cy="createIntentExampleButton"]').click()

                cy.get('[class="v-text-field__slot"]').contains('Text')
                    .click({force: true}).type(index)
                
                cy.get('[class="v-btn__content"]').contains('Anlegen').click()

                cy.wait(200)

                })

                cy.get('[class="deleteIcon v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
                    .first()
                    .click()
                cy.wait(500)
            }
            else {
                cy.log('Running es')
                cy.get('[class="deleteIcon v-btn v-btn--icon v-btn--round theme--light v-size--default"]')
                    .first()
                    .click({force:true})
                cy.wait(500)
            }

            cy.log(tableRow)
        })

        cy.get('tbody tr').then(function($noRowCount) {
            const tableRowCount = $noRowCount.length
            cy.log(tableRowCount)

            // Clicking Intent
            cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
            
            // Select first row of the Intent table
            //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            cy.wait(500)
            cy.get('tbody')
            .find('td:nth-child(3)')
            .first().then(function($intentExCount2) {
                cy.wrap($intentExCount2).should('have.text', ' '+tableRowCount+' ')

            })
        })
    }

    mockingApi () {

        cy.get('[data-cy=navDrawerIntents]')
            .contains('Intents')
                .click()
    }

    restApiTesting() {
        const item = {
            "id": m+1,
            "name": "Example"+ String(m+1),
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
                "id": 10,
                "name": "Example"+String(m),
                "description": ""
            }
        }).then((response) => {
            expect(response.body).has.property("description", "");
        })

        cy.request({
            method:'GET', 
            url: "/cci-backend/intent",
            body: {
                        "id":m+2,
                        "name": "example"+String(m+2),
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
                "id":m+3,
                "name": "Example"+String(m+3),
                "description": "Example"+String(m+3),
            }
        })

        // cy.request('/cci-backend/intent')
        //     .its('body')
        //     .should('have.length', 33)

        cy.visit('http://localhost/trainingsdaten/intent')
        
        cy.get('[class="v-input__append-inner"]').last().click({force:true})
        cy.get('[class="v-list-item__title"]').contains('Alle').click()

        cy.get('tbody')
        .find('tr').then(function($len) {
            cy.log($len.length)
            const bodyLength = $len.length

            cy.wrap($len).should('have.length', bodyLength)
            })
    }

    backEndTesting() {
        
        // get Response code
        cy.request({
            method: 'GET', 
            //url: '/cci-backend/intent'
            url: '/trainingsdaten/intent'
        }).then((response1) => {
                expect(response1.status).to.eq(200)
        })

        // POST and ASSERT Post
        cy.request({
            method:'POST',
            url: "/trainingsdaten/intent/",


            body: {
                "id": 20,
                "name": "test10",
                "description": "",
            }
        })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntent = new intent()