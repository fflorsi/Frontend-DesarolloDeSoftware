import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpProviderService } from '../../Service/http-provider.service';

@Component({
  selector: 'app-link-vaccine-dialog',
  templateUrl: './link-vaccine-dialog.component.html',
  styleUrls: ['./link-vaccine-dialog.component.scss']
})
export class LinkVaccineDialogComponent {
  vaccines: any[] = []; // Lista de vacunas
  selectedVaccines: { [key: string]: boolean } = {}; // Cambia a un objeto

  constructor(
    private httpProvider: HttpProviderService,
    public dialogRef: MatDialogRef<LinkVaccineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getVaccines(); // Obtener la lista de vacunas
  }

  getVaccines(): void {
    this.httpProvider.getVaccines().subscribe({
      next: (response: any) => {
        this.vaccines = response.data || [];
      },
      error: (error: any) => {
        console.error('Error fetching vaccines', error);
      }
    });
  }

  linkVaccine(): void {
  const selectedIds = Object.keys(this.selectedVaccines).filter(id => this.selectedVaccines[id]);
  if (selectedIds.length > 0) {
    selectedIds.forEach(id => {
      this.httpProvider.linkVaccineToMedicalHistory(this.data.medicalHistoryId, Number(id)).subscribe({
        next: (response: any) => {
        },
        error: (error: any) => {
          console.error('Error linking vaccine:', error);
        }
      });
    });
    this.dialogRef.close(true); // Cerrar el diálogo y devolver true
  }
}
}