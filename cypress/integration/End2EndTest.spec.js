import { beforeEach } from "mocha"
import { onFrontend } from "../support/page_objects/oberflaescheTest"

describe ('Test Case - 1', () => {

    beforeEach('visit url', () => {
        cy.visit('/')
        cy.get('[class="v-list-item__title"]').contains('Trainingsdaten').click()
        cy.get("[data-cy=navDrawerIntents]").click()
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
    })

    it('Testing Menu', () => {

        onFrontend.titleOfThePage()
        onFrontend.userInfo()
        onFrontend.menuBar()
    })
})

describe ('Test Case - 2', () => {

    beforeEach('visit url', () => {
        cy.visit('/')
        cy.wait(1000)
    })

    it('Test Case: Intents hinzufuegen', () => {
        onFrontend.intents()
        //onFrontend.Entities()
    })

    it('Test Case: Intent bearbeiten', () => {
        onFrontend.intent_bearbeiten()
    })

    it('Test Case: Intent suchen', () => {
        onFrontend.intent_suchen()
    })

    it('Test Case: Intent Example hinzufuegen', () => {
        onFrontend.intentExampleHinzufuegen()
    })

    it('Test Case: Intent Example Suchen', () => {
        onFrontend.intentExampleSuchen()
    })

    it('Test Case: Intent Example Loeschen', () => {
        onFrontend.intentExampleLoeschen()
    })
})

describe('Test Case - 3, Mocking Network Response ', () => {

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
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
        cy.get('[class="v-list-item__title"]')
            .contains('Trainingsdaten')
            .click()
    })

    it('Mocking Network Response', () => {
        onFrontend.mockingApi ()
    })
})

describe("Test Case - 4, Testing API Endpoints", () => {

    beforeEach('visit url', () => {

        cy.visit('/')
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

        cy.get('[class="v-list-item__title"]')
            .contains('Trainingsdaten')
            .click()
    })

    it("Test Get Request", () => {

        onFrontend.restApiTesting()
    })
})

describe("Test Case - 5, Backend Testing", () => {

    beforeEach('visit url', () => {

        cy.visit('/', {failOnStatusCode: false})
        //cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()

        cy.get('[class="v-list-item__title"]')
            .contains('Trainingsdaten')
            .click()
    })
    
    it("Get Request", () => {
        onFrontend.backEndTesting()
    })
})