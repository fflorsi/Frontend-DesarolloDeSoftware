import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { WebApiService } from '../Service/web-api.service';

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
    this.petId = this.route.snapshot.params['petId'];      
    this.getPetDetailById();
  }

  getPetDetailById(): void {
    this.httpProvider.getPetDetailById(this.petId).subscribe({
      next: (response: any) => {
        if (response != null && response.data != null) {
          this.petDetail = response.data; // Accessing the nested data object
          console.log('Pet details:', this.petDetail);
        } else {
          console.error('No data found in response:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching pet details', error);
      },
      complete: () => {
        console.log('Fetch pet details complete');
      }
    });
  }

  editPet(): void{
    this.httpProvider.getPetDetailById(this.petId).subscribe({
      
    })
  }
}