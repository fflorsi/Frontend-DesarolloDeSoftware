import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { Professional } from '@app/interfaces/professional';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-professional',
  templateUrl: './view-professional.component.html',
  styleUrls: ['./view-professional.component.scss']
})
export class ViewProfessionalComponent implements OnInit {

  professionalId: any;
  professionalDetail: Professional | null = null;

  constructor(private route: ActivatedRoute, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.getProfessionalDetailById();
  }

  getProfessionalDetailById(): void {
    this.professionalId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.professionalId);
    this.httpProvider.getProfessionalDetailById(this.professionalId).subscribe({
      next: (response: any) => {
        this.professionalDetail = response.data || response;
        console.log(this.professionalDetail);
      },
      error: (error) => {
        console.error('Error fetching professional data', error);
      }
    });
  }

  editProfessional(): void {
    this.httpProvider.getProfessionalDetailById(this.professionalId).subscribe({
      
    })
  }
}


