import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'app/interfaces/client';
import { ClientService } from 'app/services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss'] 
})
export class AddEditClientComponent implements OnInit {

  formClient: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Añadir';

  constructor(
    private fb: FormBuilder,
    private _clientService: ClientService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formClient = this.fb.group({
      dni: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      birthDate: ['', Validators.required],
    });

    this.id = aRouter.snapshot.paramMap.get('id') ? Number(aRouter.snapshot.paramMap.get('id')) : 0;  
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.getClient(this.id);
    }
  }

  getClient(id: number) {
    this.loading = true;
    this._clientService.getClientDetailById(id).subscribe({
      next: (response: any) => { // Usa 'any' para la respuesta
        const data = response.data; // Accede a 'data' directamente
        this.loading = false;
        const birthdate = new Date(data.birthDate).toISOString().split('T')[0]; // Convertir la fecha al formato YYYY-MM-DD
        this.formClient.setValue({
          dni: data.dni,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          phone: data.phone,
          email: data.email,
          birthDate: birthdate
        });
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Error al cargar los datos del cliente', 'Error');
      }
    });
  }

  addClient() {
    if (this.formClient.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Formulario inválido');
      return;
    }

    const client: Client = {
      dni: this.formClient.value.dni,
      firstname: this.formClient.value.firstname,
      lastname: this.formClient.value.lastname,
      address: this.formClient.value.address,
      phone: this.formClient.value.phone,
      email: this.formClient.value.email,
      birthDate: this.formClient.value.birthDate,
    };
    

    this.loading = true;
    if (this.id !== 0) {
      this._clientService.updateClient(this.id, client).subscribe(() => {
        this.toastr.info(`El cliente ${client.firstname} ${client.lastname} fue actualizado con éxito`, 'Cliente actualizado');
        this.loading = false;
        this.router.navigate(['/listClients']);
      });
      
    } else {
      this._clientService.saveClient(client).subscribe(() => {
        this.toastr.success(`El cliente ${client.firstname} ${client.lastname} fue registrado con éxito`, 'Cliente registrado');
        this.loading = false;
        this.router.navigate(['/listClients']);
      });
    }
  }
}
