import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService } from '@app/services/report.service'; // Asegúrate de tener el servicio que hace la petición
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-most-attended-pets',
  templateUrl: './most-attended-pets.component.html',
  styleUrls: ['./most-attended-pets.component.scss']
})
export class MostAttendedPetsComponent implements OnInit {
  chart: any;
  petData: any[] = [];
  clientId!: number;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getClientIdFromToken(); 
    this.getMostAttendedPets(); 
  }

  getClientIdFromToken(): void {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.clientId = decodedToken.clientId;
      } else {
        console.error('No se encontró el token');
      }
    }
  getMostAttendedPets(): void {

    this.reportService.getMostAttendedPets(this.clientId).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.petData = data;  
          this.createChart();  
        } else {
          console.warn('No se encontraron datos de mascotas.');
        }
      },
      error => {
        console.error('Error al obtener las mascotas con más atenciones:', error);
      }
    );
  }

  createChart(): void {
    const petNames = this.petData.map(pet => pet.petName);
    const attentionCounts = this.petData.map(pet => pet.attentionCount);

    const canvasElement = document.getElementById('attendedPetsChart') as HTMLCanvasElement;
    const ctx = canvasElement.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',  // Gráfico de barras
        data: {
          labels: petNames,  // Nombres de las mascotas
          datasets: [{
            label: 'Atenciones Recibidas',
            data: attentionCounts,  // Cantidad de atenciones
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
            borderColor: 'rgba(75, 192, 192, 1)',  // Color del borde
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
