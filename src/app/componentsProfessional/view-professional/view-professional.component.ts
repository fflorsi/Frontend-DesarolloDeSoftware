import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalService } from '@app/services/professional.service';
import { Professional } from '@app/interfaces/professional';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-professional',
  templateUrl: './view-professional.component.html',
  styleUrls: ['./view-professional.component.scss']
})
export class ViewProfessionalComponent implements OnInit {
  professionalDetail!: Professional;

  constructor(
    private _professionalService: ProfessionalService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const professionalId = Number(this.route.snapshot.paramMap.get('id'));
    this._professionalService.getProfessionalDetailById(professionalId).subscribe(
      (response: any) => {
        this.professionalDetail = response.data;
        console.log(this.professionalDetail);
      },
      (error) => {
        console.error('Error fetching professional data', error);
      }
    );
  }

  deleteProfessional(id: number) {
    this._professionalService.deleteProfessionalById(id).subscribe(() => {
      this.ngOnInit();
      this.toastr.warning('El profesional fue eliminado con éxito', 'Profesional eliminado');
    });
  }
}