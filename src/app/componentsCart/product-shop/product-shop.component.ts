import { Component, OnInit } from '@angular/core';
import { Product } from '@app/interfaces/product';
import { ProductService } from '@app/services/product.service';
import { CartService } from '@app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.scss'
})
export class ProductShopComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  paginator = {
    pageIndex: 0,
    pageSize: 6
  };
  pageEvent?: PageEvent;

  constructor(
    private _productService: ProductService, private _cartService: CartService, private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.getProduct().subscribe((response: any) => {
      console.log('Respuesta del servidor:', response);
      this.products = response.data;
      this.setPaginatedProducts(); // Llama a setPaginatedProducts después de cargar los productos
    },
    (error) => {
      console.error('Error al cargar productos', error);
    });
  }

  addToCart(product: Product) {
    console.log('Producto recibido en el componente:', product);
    this._cartService.addToCart(product); // Llamar al método corregido en el servicio
    this._toastrService.success('Producto añadido al carrito');

  }

  setPaginatedProducts() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedProducts();
  }
}