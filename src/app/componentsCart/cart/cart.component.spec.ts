import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '@app/services/cart.service';
import { OrderService } from '@app/services/order.service';
import { ClientService } from '@app/services/client.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@app/interfaces/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', ['items$', 'totalCart', 'deleteProduct', 'cleanCart', 'updateQuantity']);
    const orderSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: OrderService, useValue: orderSpy },
        { provide: ClientService, useValue: {} },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Debe inicializar el carrito con productos', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Producto 1', price: 100, quantity: 2, stock: 10, description: 'Desc 1', category: 'Cat 1' },
      { id: 2, name: 'Producto 2', price: 50, quantity: 1, stock: 5, description: 'Desc 2', category: 'Cat 2' }
    ];

    cartServiceSpy.items$ = of(mockProducts);
    cartServiceSpy.totalCart.and.returnValue(250);

    fixture.detectChanges();

    expect(component.items.length).toBe(2);
    expect(component.total).toBe(250);
  });

  it('Debe aumentar la cantidad de un producto si hay stock', () => {
    const product: Product = { id: 1, name: 'Producto', price: 100, quantity: 1, stock: 10, description: 'Desc', category: 'Cat' };

    component.increaseQuantity(product);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(product, 2);
  });

  it('Debe disminuir la cantidad de un producto si es mayor a 1', () => {
    const product: Product = { id: 1, name: 'Producto', price: 100, quantity: 2, stock: 10, description: 'Desc', category: 'Cat' };

    component.decreaseQuantity(product);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(product, 1);
  });

  it('Debe eliminar un producto del carrito', () => {
    component.deleteProduct(1);
    expect(cartServiceSpy.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('Debe limpiar el carrito correctamente', () => {
    component.cleanCart();
    expect(cartServiceSpy.cleanCart).toHaveBeenCalled();
  });

  it('Debe redirigir al usuario si no está logueado en checkout', () => {
    component.isUserLoggedIn = false;
    component.checkout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Debe generar una orden correctamente al hacer checkout', () => {
    // Mock de datos
    component.items = [
      { id: 1, name: 'Producto 1', price: 100, quantity: 2, stock: 10, description: 'Desc', category: 'Cat' },
    ];
    component.total = 200;
    component.isUserLoggedIn = true;

    spyOn(component, 'getClientIdFromToken').and.returnValue(123); // Simula clientId
    orderServiceSpy.createOrder.and.returnValue(
      of({
        message: 'Orden creada exitosamente',
        order: {
          items: [
            { id: 1, quantity: 2, price: 100, product: { id: 1, name: 'Producto 1' } }
          ],
          total: 200,
          clientId: 123
        }
      })
    );
    

    component.checkout();

    expect(orderServiceSpy.createOrder).toHaveBeenCalled();
    expect(cartServiceSpy.cleanCart).toHaveBeenCalled();
  });
});