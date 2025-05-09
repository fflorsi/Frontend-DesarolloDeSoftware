import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '@app/interfaces/product';
import { ProductService } from '@app/services/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  formProduct: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Añadir';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      category: ['', Validators.required],
    });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProductDetailById(id).subscribe({
      next: (response: any) => { // Usa 'any' para la respuesta
        const data = response.data; // Accede a 'data' directamente
        this.loading = false;
        this.formProduct.setValue({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al cargar los datos del producto', 'Error');
      }
    });
  }

  addProduct() {
    if (this.formProduct.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
      return;
    }

    const product: Product = {
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      price: this.formProduct.value.price,
      stock: this.formProduct.value.stock,
      category: this.formProduct.value.category,
    };
    

    this.loading = true;
    if (this.id !== 0) {
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.description} ${product.price} fue actualizado con éxito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/listProducts']);
      });
      
    } else {
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue registrado con éxito`, 'Producto registrado');
        this.loading = false;
        this.router.navigate(['/listProducts']);
      });
    }
  }
}
