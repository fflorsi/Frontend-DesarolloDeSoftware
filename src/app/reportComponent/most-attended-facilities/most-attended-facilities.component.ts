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
  facilitiesData: any[] = []; 

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
      
          const facilityNames = this.facilitiesData.map((item: any) => item.Facility.name)
          const attendedCount = this.facilitiesData.map((item: any) => item.attendedCount)
  
   
          if (this.chart) {
            this.chart.destroy();
          }

          this.chart = new Chart(ctx, {
            type: 'pie',  
            data: {
              labels: facilityNames,
              datasets: [{
                label: 'Facilities Más Atendidas',
                data: attendedCount,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'], 
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  enabled: true,
                },
              },
            }
          });
        } else {
          console.error('No se pudo obtener el contexto 2D para el canvas.')
        }
      } else {
        console.error('No se encontró el elemento canvas con el ID facilitiesChart.')
      }
    }, 0); 
  }
}
