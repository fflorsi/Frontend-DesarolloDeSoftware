// delete-observation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-observation-dialog',
  template: `
    <h2 mat-dialog-title>Confirmar eliminación</h2>
    <mat-dialog-content>
      ¿Está seguro que desea eliminar esta observación?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button color="warn" (click)="onYesClick()">Eliminar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-actions {
      margin-bottom: 10px;
    }
  `]
})
export class DeleteObservationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteObservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}