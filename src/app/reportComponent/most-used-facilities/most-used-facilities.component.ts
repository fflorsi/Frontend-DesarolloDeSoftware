import { Component, OnInit } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'; // Importar lo necesario
import { ReportService } from '@app/services/report.service'; 
import { jwtDecode } from 'jwt-decode';

// Registrar el tipo de gráfico 'pie' y otros elementos
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-most-used-facilities',
  templateUrl: './most-used-facilities.component.html',
  styleUrls: ['./most-used-facilities.component.scss']
})
export class MostUsedFacilitiesComponent implements OnInit {
  clientId!: number;
  chart: any; 
  mostUsedFacilities: any[] = [

  ]; // Datos de las instalaciones más usadas

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getClientIdFromToken();
    this.getMostUsedFacilities();
    this.createChart(); 
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
  getMostUsedFacilities(): void {
    this.reportService.getMostUsedFacilitiesByClient(this.clientId).subscribe(
      (data: any[]) => {
        this.mostUsedFacilities = data;
        this.createChart(); // Creamos el gráfico una vez que tengamos los datos
      },
      error => {
        console.error('Error al obtener las facilities:', error);
      }
    );
  }
  createChart(): void {
    // Primero, destruimos el gráfico anterior si existe
    if (this.chart) {
      this.chart.destroy();
    }

    setTimeout(() => {
      const canvasElement = document.getElementById('facilityPieChart');
      if (canvasElement) {
        const ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
        if (ctx) {
          const chartData = this.mostUsedFacilities.map((facility) => facility.usageCount);
          const chartLabels = this.mostUsedFacilities.map((facility) => facility.facilityName);

          this.chart = new Chart(ctx, {
            type: 'pie',  // Cambiar a pie para un gráfico de torta
            data: {
              labels: chartLabels,
              datasets: [{
                data: chartData,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],  // Colores del gráfico
                hoverBackgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6']
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return tooltipItem.label + ': ' + tooltipItem.raw;
                    }
                  }
                }
              }
            }
          });
        } else {
          console.error('No se pudo obtener el contexto 2D para el canvas.');
        }
      } else {
        console.error('No se encontró el elemento canvas con el ID facilityPieChart.');
      }
    }, 0);  // Usamos setTimeout para asegurarnos que el DOM esté completamente cargado
  }
}
