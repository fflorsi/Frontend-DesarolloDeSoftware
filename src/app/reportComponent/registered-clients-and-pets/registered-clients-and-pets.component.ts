import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '@app/services/report.service'; 

interface MonthlyData {
  month: string;
  totalClients: number;
  totalPets: number;
}

interface StatisticalSummary {
  mean: number;
  median: number;
  standardDeviation: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  growthRate: number;
}

interface AnalyticsData {
  clientStats: StatisticalSummary;
  petStats: StatisticalSummary;
  correlation: number;
  forecast: { clients: number; pets: number };
}

@Component({
  selector: 'app-registered-clients-and-pets',
  templateUrl: './registered-clients-and-pets.component.html',
  styleUrls: ['./registered-clients-and-pets.component.scss']
})
export class RegisteredClientsAndPetsComponent implements OnInit, OnDestroy {

  totalClients: number = 0;
  totalPets: number = 0;
  monthlyData: MonthlyData[] = [];
  analytics: AnalyticsData | null = null;
  isLoading: boolean = true;
  chart: Chart | null = null;

  constructor(private reportService: ReportService) {
    Chart.register(...registerables);  
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  getData(): void {
    this.isLoading = true;
    this.reportService.getRegisteredClientsAndPets().subscribe({
      next: (response) => {
        this.totalClients = response.totalClients;
        this.totalPets = response.totalPets;
        this.monthlyData = response.monthlyData;
        
        // Data preprocessing and statistical analysis
        this.analytics = this.performStatisticalAnalysis();
        
        this.createChart();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
        this.isLoading = false;
      }
    });
  }

  // Advanced data preprocessing and statistical analysis
  private performStatisticalAnalysis(): AnalyticsData {
    const clientData = this.monthlyData.map(d => d.totalClients);
    const petData = this.monthlyData.map(d => d.totalPets);

    return {
      clientStats: this.calculateStatistics(clientData),
      petStats: this.calculateStatistics(petData),
      correlation: this.calculateCorrelation(clientData, petData),
      forecast: this.calculateForecast(clientData, petData)
    };
  }

  private calculateStatistics(data: number[]): StatisticalSummary {
    const sorted = [...data].sort((a, b) => a - b);
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Calculate trend using linear regression
    const trend = this.calculateTrend(data);
    const growthRate = data.length > 1 ? ((data[data.length - 1] - data[0]) / data[0]) * 100 : 0;

    return {
      mean: Math.round(mean * 100) / 100,
      median,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      trend,
      growthRate: Math.round(growthRate * 100) / 100
    };
  }

  private calculateTrend(data: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (data.length < 2) return 'stable';
    
    let increases = 0;
    let decreases = 0;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i] > data[i - 1]) increases++;
      else if (data[i] < data[i - 1]) decreases++;
    }
    
    if (increases > decreases) return 'increasing';
    if (decreases > increases) return 'decreasing';
    return 'stable';
  }

  private calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : Math.round((numerator / denominator) * 100) / 100;
  }

  private calculateForecast(clientData: number[], petData: number[]): { clients: number; pets: number } {
    // Simple linear regression for next period forecast
    const forecastClient = this.linearForecast(clientData);
    const forecastPet = this.linearForecast(petData);
    
    return {
      clients: Math.round(forecastClient),
      pets: Math.round(forecastPet)
    };
  }

  private linearForecast(data: number[]): number {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i + 1);
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = data.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return slope * (n + 1) + intercept;
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'increasing': return '#28a745';
      case 'decreasing': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getCurrentDate(): Date {
    return new Date();
  }

  createChart(): void {
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = (document.getElementById('clientsPetsChart') as HTMLCanvasElement)?.getContext('2d');
  
    if (ctx && this.monthlyData.length > 0) {
      const months = this.monthlyData.map(data => data.month);
      const clients = this.monthlyData.map(data => data.totalClients);
      const pets = this.monthlyData.map(data => data.totalPets);
  
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Clientes Registrados',
              data: clients,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#007bff',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6
            },
            {
              label: 'Mascotas Registradas',
              data: pets,
              borderColor: '#7b2cbf',
              backgroundColor: 'rgba(123, 44, 191, 0.1)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#7b2cbf',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'bold'
                },
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#007bff',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Período',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Cantidad Registrada',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }
      });
    } else {
      console.error('No se encontró el contexto del canvas o no hay datos disponibles.');
    }
  }
}
