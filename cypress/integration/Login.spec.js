import { onLogin } from "../support/page_objects/Login"

describe("Test Case: Login", () => {
   
    beforeEach('visit url', () => {
    
        cy.visit('/')
        //cy.url().should("eq", "http://localhost/login");
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        //cy.login('admin', 'cciAdmin#2022+')
    })

    it("Log in to the page", () => {
        onLogin.Test_LogIn()

        /* What are you testing here*/
    })
})