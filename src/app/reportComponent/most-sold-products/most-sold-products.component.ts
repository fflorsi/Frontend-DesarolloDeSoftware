import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { ReportService } from '@app/services/report.service';

// Registrar los componentes de Chart.js
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
          this.products = data; // Ahora estamos recibiendo un array directamente
          this.createChart(this.products); // Crear el gráfico con los datos
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
    // Si ya existe un gráfico, lo destruimos
    if (this.chart) {
      this.chart.destroy();
      this.chart = null; // Limpiamos la referencia
    }

    // Eliminamos el canvas del DOM y lo volvemos a crear
    const canvasElement = document.getElementById('mostSoldProductsChartCanvas');
    if (canvasElement) {
      canvasElement.remove(); // Eliminamos el canvas anterior si existe
    }

    // Creamos un nuevo canvas dinámicamente
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'mostSoldProductsChartCanvas'; // Asignamos un nuevo ID para el canvas
    document.getElementById('mostSoldProductsChart')?.appendChild(newCanvas); // Insertamos el nuevo canvas en el contenedor

    // Nuevas referencias después de crear el canvas
    const ctx = newCanvas.getContext('2d');
    if (ctx) {
      const labels = data.map((item: any) => item.product.name); // Nombres de productos
      const chartData = data.map((item: any) => item.totalQuantity); // Cantidades vendidas

      // Crear el nuevo gráfico
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
