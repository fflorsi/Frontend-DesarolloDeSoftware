import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService } from '@app/services/report.service'; 
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-client-monthly-spending',
  templateUrl: './client-monthly-spending.component.html',
  styleUrls: ['./client-monthly-spending.component.scss']
})
export class ClientMonthlySpendingComponent implements OnInit {
  clientId!: number;
  chart: any;
  spendingData: any[] = []; // Datos del gasto mensual

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getClientIdFromToken(); 
    this.getMonthlySpending(); 
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

  getMonthlySpending(): void {
    this.reportService.getMonthlySpending(this.clientId).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.spendingData = data;
          this.createChart(); 
        } else {
          console.warn('No se encontraron datos de gasto.');
        }
      },
      error => {
        console.error('Error al obtener el gasto mensual:', error);
      }
    );
  }

  createChart(): void {
    setTimeout(() => {
      const canvasElement = document.getElementById('spendingChart');
      if (canvasElement) {
        const ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
        if (ctx) {
          const months = this.spendingData.map((item: any) => item.month);
          const totalSpent = this.spendingData.map((item: any) => item.totalSpent);
  
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                label: 'Gasto Mensual ($)',
                data: totalSpent,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true }
              }
            }
          });
        } else {
          console.error('No se pudo obtener el contexto 2D para el canvas.');
        }
      } else {
        console.error('No se encontró el elemento canvas con el ID spendingChart.');
      }
    }, 0);
  }
}
