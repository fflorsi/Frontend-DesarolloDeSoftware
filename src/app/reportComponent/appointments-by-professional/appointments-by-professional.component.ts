import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService } from '@app/services/report.service'; 
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-appointments-by-professional',
  templateUrl: './appointments-by-professional.component.html',
  styleUrls: ['./appointments-by-professional.component.scss']
})
export class AppointmentsByProfessionalComponent implements OnInit {
  professionalId!: number;
  chart: any;
  appointmentsData: any[] = []; // Para almacenar las citas

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getProfessionalIdFromToken(); // Obtener el ID del profesional
    this.getAppointments(); // Traer las citas del profesional
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

  getAppointments(): void {
    this.reportService.getAppointmentsByProfessional(this.professionalId).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.appointmentsData = data;
          console.log('Citas:', this.appointmentsData);
          this.createChart(); 
        } else {
          console.warn('No se encontraron citas para este profesional.');
        }
      },
      error => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy(); 
    }
  
    setTimeout(() => {  // Retraso para asegurar que el canvas se haya renderizado
      const canvasElement = document.getElementById('appointmentsChart');
      if (canvasElement) {
        const ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
        if (ctx) {
          // Extraer los meses y el conteo de citas
          const months = this.appointmentsData.map((item: any) => item.date);
          const appointmentsCount = this.appointmentsData.map((item: any) => item.count);
  
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                label: 'Citas por Mes',
                data: appointmentsCount,
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
      }
    }, 100);  // Retardo de 100ms
  }
}
