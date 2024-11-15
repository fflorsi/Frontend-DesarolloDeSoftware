import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-observation-dialog',
  template: `
    <div class="observation-dialog">
      <h2>Detalles de la Observación</h2>
      <mat-dialog-content>
        <p><strong>Descripción:</strong>{{ data.observation.description }}</p>
        <div class="observation-metadata">
          <p><strong>Fecha:</strong> {{ data.observation.createdAt | date:'shortDate'}}</p>
          <p><strong>Profesional:</strong> {{ data.observation.professional }}</p>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Cerrar</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./show-observation-dialog.component.scss']
})
export class ShowObservationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowObservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { observation: any }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}