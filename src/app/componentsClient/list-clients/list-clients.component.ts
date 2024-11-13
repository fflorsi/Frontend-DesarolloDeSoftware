import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'app/interfaces/client';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {
  listClients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private _clientService: ClientService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListClients();
  }

  getListClients() {
    this.loading = true;
    this._clientService.getClients().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.listClients = response.data;
        this.filteredClients = this.listClients;
        this.loading = false;
      },
      error => {
        console.error("Error al cargar clientes:", error);
        this.loading = false;
      }
    );
  }

  deleteClient(id: number) {
    this.loading = true;
    this._clientService.deleteClientById(id).subscribe(() => {
      this.getListClients();
      this.toastr.warning('El cliente fue eliminado con éxito', 'Cliente eliminado');
    });
  }

  filterClients(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.listClients.filter((client) =>
      client.firstname.toLowerCase().includes(term) ||
      client.lastname.toLowerCase().includes(term) // Filtra por nombre o apellido
    );
  }
}
