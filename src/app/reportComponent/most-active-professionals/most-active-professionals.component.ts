import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService, MostActiveProfessionalsResponse } from '@app/services/report.service';  // Importar las interfaces
import { Chart } from 'chart.js';

@Component({
  selector: 'app-most-active-professionals',
  templateUrl: './most-active-professionals.component.html',
  styleUrls: ['./most-active-professionals.component.scss']
})
export class MostActiveProfessionalsComponent implements OnInit, AfterViewInit {

  mostActiveProfessionals: MostActiveProfessionalsResponse['mostActiveProfessionals'] = [];  
  chart: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getMostActiveProfessionals();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    });
  }

  getMostActiveProfessionals(): void {
    this.reportService.getMostActiveProfessionals().subscribe(
      (data) => {
        if (data && Array.isArray(data.mostActiveProfessionals)) {
          this.mostActiveProfessionals = data.mostActiveProfessionals;
          this.createChart();
        } else {
          console.error('La respuesta no tiene la estructura esperada o no es un array válido:', data);
        }
      },
      (error) => {
        console.error('Error al obtener los profesionales más activos:', error);
      }
    );
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();  
    }

    if (this.mostActiveProfessionals && this.mostActiveProfessionals.length > 0) {
      const professionalNames = this.mostActiveProfessionals.map(prof => prof.professionalName);
      const turnsAssigned = this.mostActiveProfessionals.map(prof => prof.turnsAssigned);

      const ctx = document.getElementById('professionalChart') as HTMLCanvasElement;

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: professionalNames,
          datasets: [{
            label: 'Turnos Asignados',
            data: turnsAssigned,
            backgroundColor: 'rgba(224, 170, 255, 0.54)',
            borderColor: '#7b2cbf',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
          },
        }
      });
    } else {
      
    }
  }
}
