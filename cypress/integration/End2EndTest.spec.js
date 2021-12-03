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
    })

    it('Testing Body', () => {

        onFrontend.intents()
        //onFrontend.Entities()

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
        cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
    })

    it('Mocking Network Response', () => {
        onFrontend.mockingApi ()
    })
})

describe("Testing API Endpoints", () => {

    beforeEach('visit url', () => {

        cy.visit('/')
        cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
    })

    it("Test Get Request", () => {

        onFrontend.restApiTesting()
    })
})

describe("Backend Testing", () => {

    beforeEach('visit url', () => {

        cy.visit('/', {failOnStatusCode: false})
        cy.get('[data-v-cd74aa12=""]').contains('Trainingsdaten').click()
    })
    
    it("Get Request", () => {
        onFrontend.backEndTesting()
    })
})