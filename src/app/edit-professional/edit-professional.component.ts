import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import { Professional } from '@app/interfaces/professional';  

@Component({
  selector: 'app-edit-professional',
  templateUrl: './edit-professional.component.html',
  styleUrls: ['./edit-professional.component.scss']
})
export class EditProfessionalComponent implements OnInit {
  professionalId: any;
  editProfessionalForm = {
    dni: '',
    lastname: '',
    name: '',
    adress: '',
    phone_number: '',
    mail: '',
    birthdate: '',
    id: null,
  }; 
  originalName: string = '';

  @ViewChild("professionalForm") professionalForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.professionalId = this.route.snapshot.params['id'];
    this.getProfessionalDetailById();
  }

  // Obtiene los detalles del profesional por su ID
  getProfessionalDetailById(): void {
    this.httpProvider.getProfessionalDetailById(this.professionalId).subscribe({
      next: (response: any) => {
        if (response != null && response.data != null) {
          this.editProfessionalForm = response.data;
          this.originalName = response.data.name;
          console.log('Professional details:', this.editProfessionalForm);
        } else {
          console.error('No data found in response:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching professional details', error);
      },
      complete: () => {
        console.log('Fetch professional details complete');
      }
    });
  }

  // Método que se ejecuta al hacer submit
  onSubmit(form: NgForm) {
    this.isSubmitted = true; // Marca como enviado
    if (form.valid) {
      this.EditProfessional(true); // Pasa 'true' si el formulario es válido
    } else {
      this.EditProfessional(false); // Pasa 'false' si el formulario no es válido
    }
  }
  

  EditProfessional(isValid: boolean) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveProfessional(this.editProfessionalForm).subscribe({
        next: async (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              console.log('Redirigiendo a la lista de profesionales después de editar...');
              setTimeout(() => {
                this.router.navigate(['/viewAllProfessionals']);
              }, 1000);
            }
          }
        },
        error: async (error: any) => {
          this.toastr.error(error.message);
          console.log('Redirigiendo a la lista de profesionales después de error en edición...');
          setTimeout(() => {
            this.router.navigate(['/viewAllProfessionals']);
          }, 1000);
        }
      });
    }
  }

  confirmDelete() {
    if (confirm('¿Está seguro de que desea eliminar este profesional?')) {
      this.deleteProfessional();
    }
  }

  public deleteProfessional() {
    this.httpProvider.deleteProfessionalById(this.professionalId).subscribe({
      next: (response: any) => {
        const resultMessage = response?.body?.message || response?.message;
        if (resultMessage === 'Professional deleted successfully') {
          this.toastr.success('Profesional eliminado correctamente');
          setTimeout(() => {
            this.router.navigate(['/viewAllProfessionals']);
          }, 1000);
        } else {
          this.toastr.error('Unexpected response format');
        }
      },
      error: (error: any) => {
        this.toastr.error(error.message || 'Error al eliminar el profesional');
        setTimeout(() => {
          this.router.navigate(['/viewAllProfessionals']);
        }, 1000);
      }
    });
  }
  
  
  
  
  
}
