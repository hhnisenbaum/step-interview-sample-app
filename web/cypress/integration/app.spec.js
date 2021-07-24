const data = 'example.json';

describe('Search for titles', () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it('Search for a valid title', () => {
    cy.fixture(data).then(it => {
      cy.get('[data-cy=input]').type(it.validTitle);
      cy.get('[data-cy=submit]').click();
      cy.get('[data-cy=title]').should($element => {
        expect($element).to.contain("Title #" + it.validTitle)
      })
    })
  })

  it('Search for an valid title', () => {
    cy.fixture(data).then(it => {
      cy.get('[data-cy=input]').type(it.invalidTitle);
      cy.get('[data-cy=submit]').click();
      cy.get('[data-cy=title]').should($element => {
        expect($element).to.contain("Title #1")
      })
      cy.contains('Incorrect title number').should($element => {
        expect($element).to.contain("Title #" + it.invalidTitle)
      })
    })
  })

})


