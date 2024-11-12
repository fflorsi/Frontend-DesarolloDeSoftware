import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/interfaces/client';
import { Pet } from '@app/interfaces/pet';
import { ClientService } from '@app/services/client.service';
import { PetService } from '@app/services/pet.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrl: './list-pets.component.scss'
})
export class ListPetsComponent implements OnInit{
  listPets: Pet[]=[];
  clientData!: Client;
  loading: boolean=false;

constructor(private _clientService: ClientService,
  private _petService: PetService,
  private route: ActivatedRoute,
  private toastr: ToastrService){}

  ngOnInit(): void {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    this._clientService.getClientDetailById(clientId).subscribe(
      (response: any) => {  
          this.clientData = response.data;  
          console.log(this.clientData);  
      },
      (error) => {
          console.error('Error fetching client data', error);
      }
  );
  /*/this._petService.getPetsByClient(clientId).subscribe((response:any) =>{
      this.listPets = response.data;
      this.loading = false;
    }

    )/*/
  }

}
