import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Professional } from '@app/interfaces/professional';
import { ProfessionalService } from '@app/services/professional.service';


@Component({
  selector: 'app-view-all-professional',
  templateUrl: './view-all-professional.component.html',
  styleUrls: ['./view-all-professional.component.scss']
})
export class ViewAllProfessionalComponent implements OnInit {

  professionalList: any[] = [];
  loading: boolean = true;
  findProfessionalId: number | null = null;

  constructor(
    private _professionalService: ProfessionalService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllProfessionals();
  }

  getAllProfessionals(): void {
    this._professionalService.getProfessionals().subscribe({
      next: (response: any) => {
        this.professionalList = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching professional data', err);
        this.loading = false;
      }
    });
  }

  deleteProfessional(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este profesional?')) {
      this.loading = true;
      this._professionalService.deleteProfessionalById(id).subscribe(() => {
        this.getAllProfessionals();
        this.toastr.warning('El profesional fue eliminado con éxito', 'Profesional eliminado');
      });
    }
  }
}