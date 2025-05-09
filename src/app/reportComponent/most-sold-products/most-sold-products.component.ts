import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { ReportService } from '@app/services/report.service';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement);

@Component({
  selector: 'app-most-sold-products',
  templateUrl: './most-sold-products.component.html',
  styleUrls: ['./most-sold-products.component.scss']
})
export class MostSoldProductsComponent implements OnInit {
  products: any[] = [];
  chart: any;

  constructor(private _reportService: ReportService) {}

  ngOnInit(): void {
    this.getMostSoldProducts();
  }

  getMostSoldProducts() {
    this._reportService.getMostSoldProducts().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.products = data; 
          this.createChart(this.products); 
        } else {
          console.warn('No se encontraron productos más vendidos.');
        }
      },
      error => {
        console.error('Error al obtener los productos más vendidos:', error);
      }
    );
  }

  createChart(data: any) {
 
    if (this.chart) {
      this.chart.destroy();
      this.chart = null; 
    }


    const canvasElement = document.getElementById('mostSoldProductsChartCanvas');
    if (canvasElement) {
      canvasElement.remove(); 
    }

    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'mostSoldProductsChartCanvas'; 
    document.getElementById('mostSoldProductsChart')?.appendChild(newCanvas); 

    const ctx = newCanvas.getContext('2d');
    if (ctx) {
      const labels = data.map((item: any) => item.product?.name); 
      const chartData = data.map((item: any) => item.totalQuantity)
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Productos Más Vendidos',
              data: chartData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
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
      console.error('No se pudo obtener el contexto 2D para el nuevo canvas.');
    }
  }
}
