describe('Tic Tac Toe testing', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:5173')
    cy.visit('http://127.0.0.1:5173')

    //localhost => 127.0.0.1
  });

  //ar pasideda X? (X pradeda zaidima) xxxx
  // X pradeda zaidima
  // Judejimo eiliskumas
  // Lygiuju testas
  // Laimejimo salygos testas
  // Reset game veikia mygtukas
  
it('should board be empty and X first player',() => {
    cy.get('[data-testid="status"]').should('contain', 'Next player: X')
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    }); 
  });

 it('should players move alternately', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="square-0"]').should('contain', 'X');
    cy.get('[data-testid="status"]').should('contain','Next player: O')

    cy.get('[data-testid="square-5"]').click();
    cy.get('[data-testid="square-5"]').should('contain', 'O');
    cy.get('[data-testid="status"]').should('contain', 'Next player: X');
 });
 
 it('should declare winner', () => {
  cy.get('[data-testid="square-0"]').click(); // X
  cy.get('[data-testid="square-1"]').click(); //0
  cy.get('[data-testid="square-3"]').click(); //x
  cy.get('[data-testid="square-4"]').click();//0
  cy.get('[data-testid="square-6"]').click(); //X

  cy.get('[data-testid="status"]').should('contain', 'Winner: X');
 });

  it('should game reset', () => {
    cy.get('[data-testid="square-0"]').click(); // X
    cy.get('[data-testid="square-1"]').click(); //0
    cy.get('[data-testid="square-3"]').click(); //x
    cy.get('[data-testid="square-4"]').click();//0
    cy.get('[data-testid="square-6"]').click(); //X

    cy.get('[data-testid="status"]').should('contain', 'Winner: X');

    cy.get('[data-testid="reset-button"]').click();
    
    cy.get('[data-testid="status"]').should('contain', 'Next player: X')
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });


  })

 });
