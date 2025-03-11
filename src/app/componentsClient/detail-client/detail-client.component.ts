import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '@app/services/client.service';
import { Client } from '@app/interfaces/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss'] 
})
export class DetailClientComponent {
  clientData!: Client;

  constructor(
    private _clientService: ClientService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    this._clientService.getClientDetailById(clientId).subscribe(
        (response: any) => {  
            this.clientData = response.data;  
        },
        (error) => {
            console.error('Error fetching client data', error);
        }
    );
}

  deleteClient(id: number) {
    this._clientService.deleteClientById(id).subscribe(() => {
      this.ngOnInit(); // Corregido el paréntesis
      this.toastr.warning('El cliente fue eliminado con éxito', 'Cliente eliminado');
    });
  }
}
