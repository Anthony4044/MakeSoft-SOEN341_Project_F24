// cypress/integration/evaluationForm.spec.js

describe('Evaluation Form', () => {
    beforeEach(() => {
      cy.visit('/evaluationForm'); // Adjust the URL as needed
    });
  
    it('submits successfully with appropriate comments', () => {
      cy.get('input[name="commentsCooperation"]').type('Great teamwork.');
      cy.get('input[name="commentsConceptual"]').type('Excellent understanding.');
      cy.get('input[name="commentsPractical"]').type('Very practical.');
      cy.get('input[name="commentsWorkEthic"]').type('Hardworking and dedicated.');
  
      cy.get('form').submit();
  
      // Assert that submission was successful
      cy.contains('Submission successful').should('be.visible');
    });
  
    it('blocks submission with inappropriate comments', () => {
      cy.get('input[name="commentsCooperation"]').type('bithc ass');
      cy.get('input[name="commentsConceptual"]').type('hey fuck you');
  
      cy.get('form').submit();
  
      // Assert that an alert is shown
      cy.on('window:alert', (text) => {
        expect(text).to.include('contains inappropriate language');
      });
  
      // Optionally, verify that submission was prevented
      cy.contains('Submission successful').should('not.exist');
    });
  });