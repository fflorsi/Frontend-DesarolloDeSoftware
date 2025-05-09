import { Component, OnInit } from '@angular/core';
import { ReportService } from '@app/services/report.service';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, LineController, PointElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, LineController, PointElement)

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss']
})
export class MonthlyIncomeComponent implements OnInit {  
  constructor(private _reportService: ReportService) {}

  ngOnInit(): void {
    this._reportService.getMonthlyIncome().subscribe(data => {
      const labels = data.map(item => `${item.year}-${item.month < 10 ? '0' : ''}${item.month}`)
      const earnings = data.map(item => item.total);

      const chart = new Chart('monthlyEarningsChart', {
        type: 'line', 
        data: {
          labels: labels,
          datasets: [{
            label: 'Ingresos Mensuales',
            data: earnings,
            borderColor: '#e0aaff',
            fill: false,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
              min: 0,
            },
          },
        },
      });
    });
  }
}