import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-observation-dialog',
  templateUrl: './show-observation-dialog.component.html',
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