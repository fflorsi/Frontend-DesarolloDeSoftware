import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Product } from 'app/interfaces/product';
import {ProductService} from 'app/services/product.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {

  listProducts: Product[] = [];
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._productService.getProduct().subscribe((response: any) => {
      this.listProducts = response.data;
      this.loading = false;
    });
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProductById(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con éxito', 'Producto eliminado');
    });
  }
}
