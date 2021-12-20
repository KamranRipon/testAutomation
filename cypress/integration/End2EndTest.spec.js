import { beforeEach } from "mocha"
import { onIntent } from "../support/page_objects/Intents"
import { onEntity } from "../support/page_objects/Entity"
import { onLogin } from "../support/page_objects/Login"

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

describe("Login", () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
        
    // })
   
    beforeEach('visit url', () => {

        // cy.clearCookie('session_id')
        // cy.clearCookies()        
        cy.visit('/')
        // cy.setCookie('session_id', 'remember_token')
        // Cypress.Cookies.preserveOnce('session_id')
        loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(1000)
        
    })

    it("Log in to the page", () => {
        
        onLogin.logIn()
    })
})

describe ('Test Case - 1', () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {
        
        cy.visit('/')
        // Cypress.Cookies.preserveOnce('session_id', 'remember_token')

        loginiFunction('admin', 'cciAdmin#2022+')

        cy.wait(1000)
        //cy.get('[class="v-list-item__title pl-4"]').contains('Trainingsdaten').click()
        cy.get('[tabindex="0"]').contains('Trainingsdaten').click()
        cy.wait(1500)
        cy.get("[data-cy=navDrawerIntents]").click()
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
    })

    it('Testing Menu', () => {

        onIntent.titleOfThePage()
        onIntent.userInfo()
        onIntent.menuBar()
    })
})

describe ('Test Case - 2', () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(1000)
    })

    it('Test Case: Intents hinzufuegen', () => {
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

describe('Test Case - 3, Mocking Network Response ', () => {

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
        
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        loginiFunction('admin', 'cciAdmin#2022+')
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()
    })

    it('Mocking Network Response', () => {
        onIntent.mockingApi ()
    })
})

describe("Test Case - 4, Testing API Endpoints", () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {
        
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        loginiFunction('admin', 'cciAdmin#2022+')
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()
    })

    it.skip("Test Get Request", () => {
        onIntent.restApiTesting()
    })
})

describe("Test Case - 5, Backend Testing", () => {

    // before(() => {
    //     cy.login('admin', 'cciAdmin#2022+')
    // })

    beforeEach('visit url', () => {

        cy.visit('/', {failOnStatusCode: false})
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        //loginiFunction('admin', 'cciAdmin#2022+')
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

        cy.get('[class="v-list-item__title pl-4"]')
            .contains('Trainingsdaten')
            .click()
    })
    
    it.skip("Get Request", () => {
        onIntent.backEndTesting()
    })
})

describe("Entity", () => {

    

    beforeEach('visit url', () => {
        cy.login('admin', 'cciAdmin#2022+')
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