describe( 'homepage dnd testing', function () {
    before( function() {
     cy.visit( 'http://localhost:3000' );
    } );
 
   it( 'is dnd working correct for buns', function() {
     cy.get( 'article[class^="card_card"]' ).first()
       .trigger( 'dragstart' );
 
     cy.get( 'section[class^="burger-constructor_constructor"]' )
       .trigger( 'dragenter' )
       .trigger( 'drop' );
 
     cy.get( 'div[class^="bun_bun"]' ).should( 'be.exist' );
   } );

   it( 'is dnd working correct for fillers', function() {
    cy.get( 'article[class^="card_card"]' ).eq(3)
      .trigger( 'dragstart' );

    cy.get( 'section[class^="burger-constructor_constructor"]' )
      .trigger( 'dragenter' )
      .trigger( 'drop' );

    cy.get( 'li[class^="ingredient_list_item"]' ).should( 'be.exist' );
  } );
 } );