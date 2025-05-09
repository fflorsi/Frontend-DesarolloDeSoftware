import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from '@app/services/professional.service';
import { Professional } from '@app/interfaces/professional';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-observation-dialog',
  templateUrl: './edit-observation-dialog-component.component.html',
  styleUrls: ['./edit-observation-dialog-component.component.scss']
})
export class EditObservationDialogComponent implements OnInit {
  form: FormGroup;
  professionals: Professional[] = [];
  selectedProfessionalName: string = '';
  selectedProfessionalId!: number | 0;
  panelOpenState = false;
  isCalendarOpen = false;
  


  constructor(
    public dialogRef: MatDialogRef<EditObservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private professionalService: ProfessionalService,
    private overlayContainer: OverlayContainer,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      id: [data.observation.id],
      description: [data.observation.description, Validators.required],
      createdAt: [{ value: new Date(data.observation.createdAt), disabled: true }, Validators.required],
      professional: [data.observation.professional, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfessionals(); 
    this.selectedProfessionalId = this.data.observation.professional;
    this.selectedProfessionalName = `${this.data.observation.professionalData.firstname} ${this.data.observation.professionalData.lastname}`;

  }

  loadProfessionals(): void {
    this.professionalService.getProfessionals().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.professionals = response.data;
        } else {
          console.error('Error: la API no devolvió un array válido', response);
          this.professionals = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching professionals', error);
        this.professionals = [];
      }
    });
  }



  selectProfessional(professional: Professional): void {
    this.form.patchValue({ professional: professional.id });
    this.selectedProfessionalName = `${professional.firstname} ${professional.lastname}`;
    if (professional.id !== undefined) {
      this.selectedProfessionalId = professional.id;
    }

  }

  toggleCalendar(datepicker: any) {
    this.isCalendarOpen = !this.isCalendarOpen;
    this.isCalendarOpen = false
    alert('No puede cambiar la fecha.')

  }
  onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        createdAt: this.form.get('createdAt')?.value ? this.form.get('createdAt')?.value.toISOString() : this.data.observation.createdAt,
      };
      this.dialogRef.close(formData);
    } else {
      console.error('El formulario no es válido', this.form.errors);
    } 
  }
  onCancel() {
    this.selectProfessional(this.data.observation.professionalData);
    this.dialogRef.close();
  }

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
  }
}
