import { Component, OnInit } from '@angular/core';
import { Product } from '@app/interfaces/product';
import { ProductService } from '@app/services/product.service';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.scss'
})
export class ProductShopComponent implements OnInit {
 products: Product[] = [];

 constructor(
  private _productService: ProductService, private _cartService: CartService
) {}

ngOnInit(): void {
  this.loadProducts();
}

loadProducts() {
  this._productService.getProduct().subscribe((response: any) => {
    console.log('Respuesta del servidor:', response);
    this.products = response.data;
    },
    (error) => {
      console.error('Error al cargar productos', error);
    }
  );
}
addToCart(product: Product) {
  this._cartService.addToCart(product);
}
}
