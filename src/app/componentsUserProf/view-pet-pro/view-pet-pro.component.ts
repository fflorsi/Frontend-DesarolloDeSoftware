import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../../Service/http-provider.service';
import { WebApiService } from '../../Service/web-api.service';

@Component({
  selector: 'app-view-pet-pro',
  templateUrl: './view-pet-pro.component.html',
  styleUrl: './view-pet-pro.component.scss'
})
export class ViewPetProComponent {
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
  }}
