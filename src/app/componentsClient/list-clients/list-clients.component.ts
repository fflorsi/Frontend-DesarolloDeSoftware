import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Client } from 'app/interfaces/client';
import {ClientService} from 'app/services/client.service'

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent implements OnInit {
  listClients: Client[]=[];
  loading: boolean=false;

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

  deleteClient(id: number){
    this.loading=true;
    this._clientService.deleteClientById(id).subscribe(()=>{
      this.getListClients();
      this.toastr.warning('El cliente fue eliminado con éxito','Cliente eliminado');
    })
  }
}
