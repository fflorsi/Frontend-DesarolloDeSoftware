describe('Cart Component', () => {
  beforeEach(() => {
    // Simulamos el carrito en localStorage antes de cada prueba
    const mockCart = [
      { id: 1, name: 'Producto 1', quantity: 1, price: 100, stock: 5 },
      { id: 2, name: 'Producto 2', quantity: 1, price: 50, stock: 5 }
    ];
    
    // Guardamos el carrito simulado en localStorage
    localStorage.setItem('cart', JSON.stringify(mockCart));
    
    // Ahora visitamos la página de carrito
    cy.visit('http://localhost:4200/cart');
  });

  it('Debe mostrar los productos en el carrito', () => {
    // Verificamos que al menos haya un elemento en el carrito
    cy.get('.items-in-order').should('have.length.greaterThan', 0);  
    cy.get('.items-in-order').first().find('.product-quantity').should('contain', 'Cantidad: 1'); // Verifica la cantidad inicial
  });

  it('Debe permitir aumentar la cantidad de un producto', () => {
    // Aumentamos la cantidad del primer producto
    cy.get('.items-in-order').first().find('.btn-primary').first().click();  
    
    // Verificamos que la cantidad haya aumentado a 2
    cy.get('.items-in-order').first().find('.product-quantity').should('contain', 'Cantidad: 2');
  });

  it('Debe permitir disminuir la cantidad de un producto', () => {
    // Disminuimos la cantidad del primer producto
    cy.get('.items-in-order').first().find('.btn-primary').last().click();  
    
    // Verificamos que la cantidad haya disminuido a 1
    cy.get('.items-in-order').first().find('.product-quantity').should('contain', 'Cantidad: 1');
  });

  it('Debe redirigir a login si el usuario no está logueado y intenta hacer checkout', () => {
    // Intentamos hacer checkout, lo que debería redirigir a la página de login si no hay sesión
    cy.get('.btn-success').click();  
    
    // Verificamos que se haya redirigido a la página de login
    cy.url().should('include', '/login');  
  });

  it('Debe limpiar el carrito después de realizar un pedido', () => {
    // Simulamos que hemos realizado un pedido, lo que debería limpiar el carrito
    cy.get('.btn-success').click();  
    
    // Verificamos que ya no haya productos en el carrito
    cy.get('.items-in-order').should('not.exist');  
  });
});