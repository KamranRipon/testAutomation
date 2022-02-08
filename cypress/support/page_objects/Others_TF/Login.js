export class login {

    Test_LogIn() {   
        cy.log('Loged in Successful')
        cy.visit('http://localhost/trainingsdaten/intent/')

        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        cy.visit('/')
        cy.url().should('eq', 'http://localhost/')
    }
}
// Exportint class frontEnd to End2End to test
export const onLogin = new login()