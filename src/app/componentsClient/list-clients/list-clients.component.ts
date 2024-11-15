import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'app/interfaces/client';
import { ClientService } from 'app/services/client.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit, AfterViewInit {
  listClients: Client[] = [];
  filteredClients: Client[] = [];
  paginatedClients: Client[] = [];
  loading: boolean = false;
  pageEvent?: PageEvent;
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _clientService: ClientService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListClients();
  }

  ngAfterViewInit(): void {
    this.setPaginatedClients();
  }

  getListClients() {
    this.loading = true;
    this._clientService.getClients().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.listClients = response.data;
        console.log(this.listClients)
        this.filteredClients = this.listClients;
        this.loading = false;
        this.setPaginatedClients();
      },
      error => {
        console.error("Error al cargar clientes:", error);
        this.loading = false;
      }
    );
  }

  setPaginatedClients() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedClients = this.listClients.slice(startIndex, endIndex);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedClients();
  }

  deleteClient(id: number) {
    this.loading = true;
    this._clientService.deleteClientById(id).subscribe(() => {
      this.getListClients();
      this.toastr.warning('El cliente fue eliminado con éxito', 'Cliente eliminado');
    });
  }

  searchClientsbyDNS(searchQuery: string) {
    if (this.searchQuery.trim() === '') {
      this.getListClients(); 
      return;
    }

    this.loading = true;
    console.log(this.searchQuery);
    this._clientService.searchClientsbyDNS(this.searchQuery).subscribe(
      (data: Client[]) => {
        this.listClients = data;
        console.log(data);
        this.filteredClients = data;
        this.setPaginatedClients(); 
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Cliente no encontrado:', error.message);
        } else {
          console.error('Error al buscar clientes:', error);
        }
        this.loading = false;
      }
    );
  }
}
