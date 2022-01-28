import { beforeEach } from "mocha"
import { onIntent } from "../support/page_objects/Intents"
import { onEntity } from "../support/page_objects/Entity"
import { onLogin } from "../support/page_objects/Login"
import { onSlot } from "../support/page_objects/Slot"
import { onSynonym } from "../support/page_objects/Synonyms"
import { onRules } from "../support/page_objects/Rules"
import { onResponses } from "../support/page_objects/Responses"

const { method } = require("bluebird")
const { capitalize } = require("lodash")

// Login Function
function loginiFunction(Username, Password) {
    const  userName = cy.get('[class="v-input__slot"]').contains('Benutzername').click({force:true})
    userName.type('admin')

    const  passWord =cy.get('[class="v-text-field__slot"]').contains('Passwort').click({force:true})
    passWord.type('cciAdmin#2022+')

    cy.get('[class="v-input--selection-controls__input"]').click()
    
    const anmelden = cy.get('[class="v-btn__content"]').contains('Anmelden')
    anmelden.click()

    //return minutes
}

describe("Test Case 1: Login", () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
        
    // })
   
    beforeEach('visit url', () => {

        // cy.clearCookie('session_id')
        // cy.clearCookies()        
        cy.visit('/')
        // cy.setCookie('session_id', 'remember_token')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Log in to the page", () => {
        
        onLogin.logIn()
    })
})

describe ('Test Case - 1: Menu Elements', () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {
        
        // Cypress.Cookies.preserveOnce('session_id', 'remember_token')

        //loginiFunction('admin', 'cciAdmin#2022+')
        cy.login('admin', 'cciAdmin#2022+')

        cy.wait(500)
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //cy.get('[class="v-list-item__title pl-4"]').contains('Trainingsdaten').click()
        cy.get('[tabindex="0"]').contains('Trainingsdaten').click()
        cy.wait(500)
        cy.get("[data-cy=navDrawerIntents]").click()
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
    })

    it('Testing Menu', () => {

        onIntent.titleOfThePage()
        onIntent.userInfo()
        onIntent.menuBar()
    })
})

describe ('Test Case - 2: Intent', () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {

        cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(1000)
    })

    it.only('Test Case: Intents hinzufuegen', () => {
        onIntent.intents()
        //onFrontend.Entities()
    })

    it('Test Case: Intent bearbeiten', () => {
        onIntent.intent_bearbeiten()
    })

    it('Test Case: Intent suchen', () => {
        onIntent.intent_suchen()
    })

    it('Test Case: Intent Example hinzufuegen', () => {
        onIntent.intentExampleHinzufuegen()
    })

    it('Test Case: Intent Example Suchen', () => {
        onIntent.intentExampleSuchen()
    })

    it('Test Case: Intent Example Loeschen', () => {
        onIntent.intentExampleLoeschen()
    })
})

describe('Test Case - 3: Mocking Network Response ', () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {

        cy.intercept({
            method:'GET',
            url : '/cci-backend/intent'
        },
        {
            body: 
            [
                {
                "id":6,
                "name":"Ripon",
                "description":"",
                "createDate":"2021-11-17T09:06:28.807+00:00",
                "useEntities":true,
                "version":2,
                "changeDate":"2021-11-17T09:07:04.112+00:00",
                "exampleCount":2   
                }      
            ]
        })
        cy.login('admin', 'cciAdmin#2022+')
        cy.wait(1000)
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //loginiFunction('admin', 'cciAdmin#2022+')
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()
    })

    it('Test Case 4: Mocking Network Response', () => {
        onIntent.mockingApi ()
    })
})

describe("Test Case 5: Entity", () => {

    beforeEach('visit url', () => {
        cy.login('admin', 'cciAdmin#2022+')
        cy.wait(500)
        cy.visit('/', {force:true})
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Entity Hinzufuegen", () => {
        onEntity.entityHinzufuegen()
    })

    it("Entity Suchen", () => {
        onEntity.entitySuchen()
    })

    it("Entity Bearbeiten", () => {
        onEntity.entityBearbeiten()
    })
})

describe("Test Case 6: Slot", () => {
   
    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.wait(500)
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        
        loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Slot Hinzufuegen", () => {
        onSlot.slotHinzufuegen()
    })

    it("Slot Bearbeiten", () => {
        onSlot.slotBearbeiten()
    })

    it("Slot Suchen", () => {
        onSlot.slotSuchen()
    })

    it("Slot Loeschen", () => {
        onSlot.slotLoeschen()
    })
})

// describe("Test Case - 4, Testing API Endpoints", () => {

//     // before(() => {
//     //     cy.login('admin', 'cciAdmin#2022+')
//     // })

//     beforeEach('visit url', () => {
        
//         cy.visit('/')
//         //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
//         loginiFunction('admin', 'cciAdmin#2022+')
//         //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

//         cy.get('[class="v-list-item__title pl-4"]')
//             .contains('Trainingsdaten')
//             .click()
//     })

//     it.skip("Test Get Request", () => {
//         onIntent.restApiTesting()
//     })
// })

// describe("Test Case - 5, Backend Testing", () => {

//     // before(() => {
//     //     cy.login('admin', 'cciAdmin#2022+')
//     // })

//     beforeEach('visit url', () => {

//         cy.visit('/', {failOnStatusCode: false})
//         Cypress.Cookies.preserveOnce('session_id', 'remember_token')
//         //loginiFunction('admin', 'cciAdmin#2022+')
//         //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

//         cy.get('[class="v-list-item__title pl-4"]')
//             .contains('Trainingsdaten')
//             .click()
//     })
    
//     it("Get Request", () => {
//         onIntent.backEndTesting()
//     })
// })

describe ('Test Case 7: Synonyms', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Synonym Anlegen', () => {
        onSynonym.synonymAnlegen()
    })

    it('Test Case: Synonym Bearbeiten', () => {
        onSynonym.synonymBearbeiten()
    })

    it('Test Case: Synonym Loeschen', () => {
        onSynonym.synonymLoeschen()
    })

    it('Test Case: Synonym Suchen', () => {
        onSynonym.synonymSuchen()
    })

})

describe ('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Rules Anlegen', () => {
        onRules.rulesAnlegen()
    })

    it('Test Case: Rules Bearbeiten', () => {
        onRules.rulesBearbeiten()
    })

    it('Test Case: Rules Suchen', () => {
        onRules.rulesSuchen()
    })

    it('Test Case: Rules Loeschen', () => {
        onRules.rulesLoeschen()
    })
})

describe ('Test Case 9: Responses', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Response Anlegen', () => {
        onResponses.responseAnlegen()
    })

    it('Test Case: Response Bearbeiten', () => {
        onResponses.responseBearbeiten()
    })

    it.only('Test Case: Response Texte Anlegen', () => {
        onResponses.responseTexteAnlegen()
    })

    it.only('Test Case: Response Texte Bearbeiten', () => {
        onResponses.responseTexteBearbeiten()
    })
})