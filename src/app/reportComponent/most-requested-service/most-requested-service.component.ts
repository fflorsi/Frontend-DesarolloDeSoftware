import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { ReportService } from '@app/services/report.service';

// Registrar los componentes de Chart.js
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement);

@Component({
  selector: 'app-most-requested-service',
  templateUrl: './most-requested-service.component.html',
  styleUrls: ['./most-requested-service.component.scss'] 
})
export class MostRequestedServiceComponent implements OnInit {
  services: any[] = [];
  chart: any;

  constructor(private _reportService: ReportService) { }

  ngOnInit(): void {
    this.getMostRequestedServices();
  }

  // Función para obtener los servicios más solicitados desde el backend
  getMostRequestedServices() {
    this._reportService.getMostRequestedService().subscribe(
      (data: any) => {
        this.services = data;
        this.createChart(data);
      },
      error => {
        console.error('Error al obtener los servicios más solicitados', error);
      }
    );
  }

  // Crear gráfico con los datos recibidos
  createChart(data: any) {
    const labels = data.map((item: any) => item.name);  
    const chartData = data.map((item: any) => item.totalAppointments);  

    this.chart = new Chart('most-req-comp', {
      type: 'bar',  // Tipo de gráfico
      data: {
        labels: labels,
        datasets: [{
          label: 'Servicios Más Solicitados',
          data: chartData,
          backgroundColor: '#240046',
          borderColor: '#c77dff',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}