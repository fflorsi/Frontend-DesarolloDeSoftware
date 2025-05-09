import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../../Service/http-provider.service';
import { TypeService } from '@app/services/type.service';
import { Type } from '@app/interfaces/type';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})

export class AddPetComponent implements OnInit {
  addPetForm: petForm = new petForm();
  availableTypes: Type[] = [];
  loading = false;

  @ViewChild("petForm")
  petForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService, private typeService: TypeService) { }

  ngOnInit(): void { 
    this.getAvailableTypes();
   }

  AddPet(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.savePet(this.addPetForm).subscribe(async data => {
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

  getAvailableTypes(): void {
    this.loading = true;
    this.typeService.getTypes().subscribe({
      next: (response: any) => {
        this.availableTypes = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener los tipos disponibles', 'Error');
        this.loading = false;
      }
    });
  }

}


export class petForm {
  Name: string = "";
  Age: number = 0;
  Type: string = "";
  Breed: string = "";
  Weight: number = 0;
}