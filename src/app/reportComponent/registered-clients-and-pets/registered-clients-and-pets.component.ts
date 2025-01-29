import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '@app/services/report.service'; 

interface MonthlyData {
  month: string;
  totalClients: number;
  totalPets: number;
}

@Component({
  selector: 'app-registered-clients-and-pets',
  templateUrl: './registered-clients-and-pets.component.html',
  styleUrls: ['./registered-clients-and-pets.component.css']
})
export class RegisteredClientsAndPetsComponent implements OnInit {

  totalClients: number = 0;
  totalPets: number = 0;
  monthlyData: MonthlyData[] = [];

  constructor(private reportService: ReportService) {
    Chart.register(...registerables);  
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.reportService.getRegisteredClientsAndPets().subscribe((response) => {
      this.totalClients = response.totalClients;
      this.totalPets = response.totalPets;
      this.monthlyData = response.monthlyData;
      this.createChart();
    }, (error) => {
      console.error('Error al obtener los datos:', error);
    });
  }

  createChart(): void {
    const ctx = (document.getElementById('clientsPetsChart') as HTMLCanvasElement).getContext('2d');
  
    if (ctx) {
      const months = this.monthlyData.map(data => data.month);
      const clients = this.monthlyData.map(data => data.totalClients);
      const pets = this.monthlyData.map(data => data.totalPets);
  
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Clientes Registrados',
              data: clients,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Mascotas Registradas',
              data: pets,
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mes'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad'
              },
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('No se encontró el contexto del canvas.');
    }
  }
}
