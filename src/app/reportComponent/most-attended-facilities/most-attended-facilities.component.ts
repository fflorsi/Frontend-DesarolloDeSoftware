import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService } from '@app/services/report.service'; 
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-most-attended-facilities',
  templateUrl: './most-attended-facilities.component.html',
  styleUrls: ['./most-attended-facilities.component.scss']
})
export class MostAttendedFacilitiesComponent implements OnInit {
  professionalId!: number;
  chart: any;
  facilitiesData: any[] = []; // Para almacenar las facilities más atendidas

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getProfessionalIdFromToken(); 
    this.getMostAttendedFacilities(); 
  }

  getProfessionalIdFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.professionalId = decodedToken.professionalId;
    } else {
      console.error('No se encontró el token');
    }
  }

  getMostAttendedFacilities(): void {
    this.reportService.getMostAttendedFacilities(this.professionalId).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.facilitiesData = data;
          this.createChart(); 
        } else {
          console.warn('No se encontraron facilities atendidas para este profesional.');
        }
      },
      error => {
        console.error('Error al obtener las facilities más atendidas:', error);
      }
    );
  }

  createChart(): void {
    setTimeout(() => {
      const canvasElement = document.getElementById('facilitiesChart');
      if (canvasElement) {
        const ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
        if (ctx) {
          // Extraer datos para el gráfico
          const facilityNames = this.facilitiesData.map((item: any) => item.Facility.name);
          const attendedCount = this.facilitiesData.map((item: any) => item.attendedCount);
  
          // Crear el gráfico
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: facilityNames,
              datasets: [{
                label: 'Facilities Más Atendidas',
                data: attendedCount,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          console.error('No se pudo obtener el contexto 2D para el canvas.');
        }
      } else {
        console.error('No se encontró el elemento canvas con el ID facilitiesChart.');
      }
    }, 0);  // 0 ms de delay
  }
  
  
}
