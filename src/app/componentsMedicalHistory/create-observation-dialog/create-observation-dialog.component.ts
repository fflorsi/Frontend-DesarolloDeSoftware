import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpProviderService } from '../../Service/http-provider.service';

@Component({
  selector: 'app-create-observation-dialog',
  templateUrl: './create-observation-dialog.component.html',
  styleUrls: ['./create-observation-dialog.component.scss']
})
export class CreateObservationDialogComponent {
  observationText: string = '';
  professionalId: number = 0;
  professionals: any[] = []; // Lista de profesionales
  isExpanded: boolean = false

  constructor(
    public dialogRef: MatDialogRef<CreateObservationDialogComponent>,
    private httpProvider: HttpProviderService,
    @Inject(MAT_DIALOG_DATA) public data: { medicalHistoryId: number }
  ) {
    this.loadProfessionals(); // Cargar la lista de profesionales al iniciar el componente
  }

  loadProfessionals(): void {
    this.httpProvider.getProfessionals().subscribe({
      next: (response: any) => {
        this.professionals = response.data || []; // Ajustar según la estructura de la respuesta
        console.log(this.professionals)
      },
      error: (error: any) => {
        console.error('Error fetching professionals', error);
      }
    });
  }
  getProfessionalFullName(id: number): string | undefined {
    const professional = this.professionals.find(p => p.id === id);
    return professional ? `${professional.firstname} ${professional.lastname}` : undefined;
}

  selectProfessional(id: number): void {
    this.professionalId = id; // Asignar el ID del profesional seleccionado
    this.isExpanded = true
    this.closeAccordion();
    
  }

  closeAccordion(): void {
    this.isExpanded = false; // Cambia el estado del acordeón
  }

  onSubmit(): void {
    const newObservation = {
      description: this.observationText,
      professional: this.professionalId,
      medicalHistoryId: this.data.medicalHistoryId,
      name: 'Observación General'
    };

    this.httpProvider.createObservation(newObservation).subscribe({
      next: (response) => {
        console.log('Observación creada exitosamente:', response);
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error al crear la observación:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}