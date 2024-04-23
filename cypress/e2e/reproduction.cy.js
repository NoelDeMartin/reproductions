import { podUrl, serverUrl } from 'cypress-solid';

function runTest(name) {
    // Prepare the POD.
    cy.solidReset();

    // Log in to the POD.
    cy.visit('/');
    cy.get('[name="url"]').type(serverUrl()).type('{enter}');
    cy.solidLogin();

    // Create document.
    cy.intercept('PATCH', podUrl('/*')).as('createDocument');
    cy.intercept('GET', podUrl('/*')).as('getDocument');

    // Uncomment this line to debug the test by hand:
    // cy.pause();

    cy.contains(name).click();

    cy.wait('@createDocument');
    cy.wait('@getDocument');

    cy.get('@createDocument').its('response.statusCode').should('eq', 201);
    cy.get('@getDocument').its('response.statusCode').should('eq', 200);
}

describe('Reproduction', () => {
    it('Japanese text', () => runTest('行くぞ'));
    it('English text', () => runTest('Testing'));
});
