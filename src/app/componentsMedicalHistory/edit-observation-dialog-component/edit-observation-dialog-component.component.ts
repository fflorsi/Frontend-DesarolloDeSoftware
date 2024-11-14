// edit-observation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-observation-dialog',
  templateUrl: './edit-observation-dialog-component.component.html',
  styleUrls: ['./edit-observation-dialog-component.component.scss']
})
export class EditObservationDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditObservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data.observation.id],
      description: [data.observation.description], // Cambiado a description
      createdAt: [new Date(data.observation.createdAt), Validators.required],
      professional: [data.observation.professional, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        createdAt: this.form.value.createdAt.toISOString() // Asegura formato correcto de fecha
      };
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}