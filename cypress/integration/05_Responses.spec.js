import { onIntent } from "../support/page_objects/Intent/Intents"
import { onResponses } from "../support/page_objects/Responses/Responses"
import { onResponseAnlegen } from "../support/page_objects/Responses/01_responseAnlegen"
import { onResponseBearbeiten } from "../support/page_objects/Responses/02_responseBearbeiten"
import { onResponseSuchen } from "../support/page_objects/Responses/03_responseSuchen"
import { onResponsesTextAnlegen } from "../support/page_objects/Responses/04_responseTextAnlegen"
import { onResponsesTextBearbeiten } from "../support/page_objects/Responses/05_responseTextBearbeiten"
import { onResponsesTextSuchen } from "../support/page_objects/Responses/06_responseTextSuchen"
import { onResponsesTextLoeschen } from "../support/page_objects/Responses/07_responseTextLoeschen"
import { onResponsesButtonAnlegen } from "../support/page_objects/Responses/08_responseButtonAnlegen"
import { onResponsesButtonBearbeiten } from "../support/page_objects/Responses/09_responseButtonBearbeiten"
import { onResponsesButtonSuchen } from "../support/page_objects/Responses/10_responseButtonSuchen"
import { onResponsesButtonLoeschen } from "../support/page_objects/Responses/11_responseButtonLoeschen"
import { onResponsesMetaDaten } from "../support/page_objects/Responses/12_responseMetaDaten"

describe ('Test Case 9: Responses', () => {

    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case: Response Anlegen', () => {
        onResponseAnlegen.responseAnlegen() 
        /*
        A. Response Anlegen 
        1. Name should not be empty, error message should contain "Name"
            1.1 Response
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving 
        2. Check for duplicate name
            2.1 Response
                2.1.1 Error message after unsuccessful saving 
                2.1.2 Valaue should be in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must not be saved
        */
    })

    it('Test Case: Response Bearbeiten', () => {
        onResponseBearbeiten.responseBearbeiten()
        /* 
        B. Response Bearbeiten

        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Response Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving
        2. Check for duplicate name
            2.1 Response Name
                2.1.1 Error message after unsuccessful saving
                2.1.2 Valaue should be double in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in response table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('Test Case: Response Suchen', () => {
        onResponseSuchen.responseSuchen()
        
    })

    it('Test Case: Response Texte Anlegen', () => {
        onResponsesTextAnlegen.responseTexteAnlegen()
        /* 
        C. Response Text Anlegen

        1. Text Name should not be empty, error message should contain "Name"; /Currently Bug/
            1.1 Response Teste Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving  /Currently Bug/
        2. Check for successfully saved values
            3.1 Assert successfully saved Notification
            3.2 Assert in the Texte table
        3. Saving saves given data correctly
        4. Leave site via menu or breadcrump does not save value
        */
    })

    it('Test Case: Response Texte Bearbeiten', () => {
        onResponsesTextBearbeiten.responseTexteBearbeiten()
        /* 
        D. Response Text Bearbeiten

        1. Edit Name should not be empty, error message should contain "Text"
            1.1 Response Name
                1.1.1 alert message below input field
                1.1.2 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('Test Case: Response Texte Suchen', () => {
        onResponsesTextSuchen.responseTexteSuchen()
    })

    it('Test Case: Response Texte Loeschen', () => {
        onResponsesTextLoeschen.responseTexteLoeschen()
    })

    it('Test Case: Response Button Anlegen', () => {
        onIntent.intents()
        onResponsesButtonAnlegen.buttonAnlegen()
        /* 
        F. Response Button Anlegen
        1. Button Name should not be empty, error message should contain "Name"; /Currently Bug/
            1.1 Test Button Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving  /Currently Bug/
        2. Check for successfully saved values
            2.1 Assert successfully saved Notification
            2.2 Assert in the Texte table
        3. Leave site via menu or breadcrump does not save value
        */
    })

    it('Test Case: Response Button Bearbeiten', () => {
        onResponsesButtonBearbeiten.buttonBearbeiten()
        /* G. Response Button Bearbeiten
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Response Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving
        2. Check for duplicate name
            2.1 Response Name
                2.1.1 Error message after unsuccessful saving
                2.1.2 Valaue should be double in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
        does not save edited data
        */
    })

    it('Test Case: Response Button Suchen', () => {
        onResponsesButtonSuchen.buttonSuchen()
    })

    it('Test Case: Response Button Loeschen', () => {
        onResponsesButtonLoeschen.buttonLoeschen()
    })

    it('Test Case: Response Button Loeschen', () => {
        onResponsesMetaDaten.metaDaten()
        /* 
        F. Response Meta Daten
        1. Key can not be empty
            1.1 Warning message below input field
        2. Key must be unique
            2.1 Warning message below input field
        3. key must be valid
            3.1 not allowed to start or end with underscore, but allowed to 
                contain underscore
            3.2not allowed to contain ? : , [] {} # & * ! | > ` " %
        4. Value cannot be empty
            4.1 Warning message below input field
        5. add valid pair works
        6. removing of added pair works
        7. Check for successfully saved values
            7.1 Assert successfully saved Notification
            7.2 Assert in the Texte table
        8. Leave site via menu or breadcrump does not save value
        9. leave site via button "Abbrechen" navigates to table of synonyms and 
        does not save edited data
        */
    })
})