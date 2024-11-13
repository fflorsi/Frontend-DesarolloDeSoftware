import { Component, OnInit, ViewChild } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Client } from 'app/interfaces/client';
import {ClientService} from 'app/services/client.service'
import { PageEvent, MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit {
  listClients: Client[]=[];
  paginatedClients: Client[]=[];
  loading: boolean=false;
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _clientService: ClientService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getListClients();
  }

  getListClients(){
    this.loading=true;

    this._clientService.getClients().subscribe((response: any) => {
      console.log('Respuesta del servidor:', response); // Para ver la estructura completa
      this.listClients = response.data; // Accede al array a través de response.data
      this.loading = false;
    })
  }

  setPaginatedClients() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedClients = this.listClients.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedClients();
  }


  deleteClient(id: number){
    this.loading=true;
    this._clientService.deleteClientById(id).subscribe(()=>{
      this.getListClients();
      this.toastr.warning('El cliente fue eliminado con éxito','Cliente eliminado');
    })
  }
}
