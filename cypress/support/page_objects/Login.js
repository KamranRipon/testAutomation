import { capitalize, find, first, values } from "lodash"


const m = Math.floor(Math.random() * 1000);
const addValue = 'DummyValue'+String(m)
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class login {

    Test_LogIn() {   
        cy.log('Loged in Successful')
        //cy.wait(1500)
        cy.visit('http://localhost/trainingsdaten/intent/')
        
        //cy.wait(500)

        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        //cy.wait(500)
        cy.visit('/')
        cy.url().should('eq', 'http://localhost/')
        //cy.wait(500)
    }
    
}
// Exportint class frontEnd to End2End to test
export const onLogin = new login()