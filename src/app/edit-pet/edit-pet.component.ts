import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {
  petId: any;
  editPetForm: any = [];
  originalAge: number = 0;

  @ViewChild("petForm")
  petForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['petId'];
    this.getPetDetailById();
  }

  getPetDetailById(): void {
    this.httpProvider.getPetDetailById(this.petId).subscribe({
      next: (response: any) => {
        if (response != null && response.data != null) {
          this.editPetForm = response.data;
          this.originalAge = response.data.age;
          console.log('Pet details:', this.editPetForm);
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

  onSubmit() {
    this.EditPet(this.petForm.valid);
  }

  EditPet(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.savePet(this.editPetForm).subscribe({
        next: async (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              console.log('Redirigiendo a Home después de editar...');
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 1000);
            }
          }
        },
        error: async (error: any) => {
          this.toastr.error(error.message);
          console.log('Redirigiendo a Home después de error en edición...');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 1000);
        }
      });
    }
  }

  confirmDelete() {
    if (confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      this.deletePet();
    }
  }

  deletePet() {
    this.httpProvider.deletePetById(this.editPetForm).subscribe({
      next: async (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            console.log('Redirigiendo a Home después de eliminar...');
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 1000);
          }
        }
      },
      error: async (error: any) => {
        this.toastr.error(error.message);
        console.log('Redirigiendo a Home después de error en eliminación...');
        setTimeout(() => {
          this.router.navigate(['/Home']);
        }, 1000);
      }
    });
  }
}