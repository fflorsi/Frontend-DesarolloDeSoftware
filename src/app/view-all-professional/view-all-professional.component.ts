import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="modal-body">
      <p>¿Está seguro de que desea borrar?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
      <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-view-all-professional',
  templateUrl: './view-all-professional.component.html',
  styleUrls: ['./view-all-professional.component.scss'],
})
export class ViewAllProfessionalComponent implements OnInit {
  closeResult = '';
  professionalList: Array<{ dni: string; lastname: string; firstname: string; address: string; phone: string; email: string; birthDate: string; id?: number }> = [];
  professional: any;
  findProfessionalId: number | null = null;

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, private httpProvider: HttpProviderService) {}

  ngOnInit(): void {
    this.getAllProfessional();
  }

  getAllProfessional() {
    this.httpProvider.getAllProfessional().subscribe({
      next: (data: any) => {
        if (data != null && data.body != null) {
          const resultData = data.body.data;
          if (Array.isArray(resultData)) {
            this.professionalList = resultData;
            console.log('Profesionales obtenidos:', this.professionalList);
          } else {
            console.error('Se esperaba un array, pero se obtuvo:', resultData);
            this.toastr.error('Formato de datos inesperado', 'Error');
          }
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los profesionales', error);
      },
      complete: () => {
        console.log('Completada la obtención de profesionales');
      },
    });
  }

  AddProfessional() {
    this.router.navigate(['AddProfessional']);
  }

  deleteAddProfessionalConfirmation(professional: any) {
    this.modalService.open(MODALS['deleteModal'], { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.deleteProfessional(professional);
      },
      (reason) => {}
    );
  }

  deleteProfessional(professional: any) {
    this.httpProvider.deleteProfessionalById(professional.id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllProfessional();
          }
        }
      },
      (error: any) => {}
    );
  }

  viewProfessional(professionalId?: number) {
    this.router.navigate(['/ViewProfessional', professionalId]);
  }

  findProfessional() {
    if (this.findProfessionalId !== null && !isNaN(this.findProfessionalId)) {
      console.log('Buscando profesional con ID:', this.findProfessionalId);
      this.router.navigate(['/ViewProfessional', this.findProfessionalId]);
    } else {
      this.toastr.error('Por favor ingrese un ID válido', 'Error');
    }
  }
}
