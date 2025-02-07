import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../../Service/http-provider.service';
import { WebApiService } from '../../Service/web-api.service';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.scss']
})

export class ViewPetComponent implements OnInit {

  petId: any;
  petDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.getPetDetailById();
  }

  getPetDetailById(): void {
    this.petId = Number(this.route.snapshot.paramMap.get('petId'));
    console.log(this.petId);     
    this.httpProvider.getPetDetailById(this.petId).subscribe({
        next: (response: any) => {  
            this.petDetail = response.data;  
            console.log(this.petDetail); 
        },
        error: (error) => {
            console.error('Error fetching client data', error);
        }
    });
}


  editPet(): void{
    this.httpProvider.getPetDetailById(this.petId).subscribe({
      
    })
  }
}