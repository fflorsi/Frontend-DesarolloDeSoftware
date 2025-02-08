import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '@app/services/cart.service';
import { OrderService } from '@app/services/order.service';
import { ClientService } from '@app/services/client.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@app/interfaces/product';
import { BrowserTestingModule } from '@angular/platform-browser/testing'; // Añadir este módulo si se interactúa con el DOM

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', ['items$', 'totalCart', 'deleteProduct', 'cleanCart', 'updateQuantity']);

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [BrowserTestingModule], // Importar el módulo necesario para pruebas de DOM
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: OrderService, useValue: {} },
        { provide: ClientService, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('Debe inicializar el carrito con productos', () => {
    const mockProducts: Product[] = [
      { 
        id: 1, 
        name: 'Producto 1', 
        price: 100, 
        quantity: 2, 
        stock: 10, 
        description: 'Descripción del producto 1',  
        category: 'Categoría 1'  
      },
      { 
        id: 2, 
        name: 'Producto 2', 
        price: 50, 
        quantity: 1, 
        stock: 5, 
        description: 'Descripción del producto 2',  
        category: 'Categoría 2'  
      }
    ];

    cartServiceSpy.items$ = of(mockProducts);
    cartServiceSpy.totalCart.and.returnValue(250);

    fixture.detectChanges();

    expect(component.items.length).toBe(2);
    expect(component.total).toBe(250);
  });

  it('Debe aumentar la cantidad de un producto si hay stock', () => {
    const product: Product = { 
      id: 1, 
      name: 'Producto', 
      price: 100, 
      quantity: 1, 
      stock: 10, 
      description: 'Descripción del producto', 
      category: 'Categoría' 
    };

    component.increaseQuantity(product);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(product, 2);
  });

  it('Debe disminuir la cantidad de un producto si es mayor a 1', () => {
    const product: Product = { 
      id: 1, 
      name: 'Producto', 
      price: 100, 
      quantity: 2, 
      stock: 10, 
      description: 'Descripción del producto',  
      category: 'Categoría'  
    };

    component.decreaseQuantity(product);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(product, 1);
  });
});
