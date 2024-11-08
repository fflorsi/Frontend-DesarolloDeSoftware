import { Component, OnInit } from '@angular/core';
import { HttpProviderService } from '../Service/http-provider.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {
  vaccines: any[] = [];
  selectedVaccine: any = null;
  newVaccine: any = { name: '' };

  constructor(private httpProviderService: HttpProviderService) { }

  ngOnInit(): void {
    this.loadVaccines();
  }

  loadVaccines(): void {
    this.httpProviderService.getVaccines().subscribe(response => {
    this.vaccines = response.data; // Ajusta esto según la estructura de tu respuesta
  });
}

  addVaccine(): void {
    this.httpProviderService.addVaccine(this.newVaccine).subscribe(vaccine => {
      this.vaccines.push(vaccine);
      this.newVaccine = { name: '' }; // Reset input
    });
  }

  editVaccine(vaccine: any): void {
    this.selectedVaccine = { ...vaccine }; // Clonar el objeto
  }

updateVaccine(): void {
  if (this.selectedVaccine) {
    this.httpProviderService.updateVaccine(this.selectedVaccine.id, this.selectedVaccine).subscribe(updatedVaccine => {
      const index = this.vaccines.findIndex(v => v.id === updatedVaccine.id);
      if (index !== -1) {
        this.vaccines[index] = updatedVaccine; // Actualiza la vacuna en la lista
      }
      this.selectedVaccine = null; // Resetea la selección
    }, error => {
      console.error('Error al actualizar la vacuna:', error);
    });
  }
}

  deleteVaccine(id: number): void {
    this.httpProviderService.deleteVaccine(id).subscribe(() => {
      this.vaccines = this.vaccines.filter(v => v.id !== id);
    });
  }
}