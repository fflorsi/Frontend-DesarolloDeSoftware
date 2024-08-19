
import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';



@Component({
  selector: 'ng-modal-confirm',
  template:`
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Esta seguro que desea borrar?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
  
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
 const MODALS: {[name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
 };

 @Component({
    selector: 'app-view-all-pet',
    templateUrl: './view-all-pet.component.html',
    styleUrls: ['./view-all-pet.component.scss']
  })

  export class ViewAllPetComponent implements OnInit { 
    closeResult = '';
    petList: any[] = [];
    constructor(private router: Router, private modalService: NgbModal,
      private toastr: ToastrService, private httpProvider: HttpProviderService) { }
    
    ngOnInit(): void {
      this.getAllPet();
    }
    getAllPet() {
      this.httpProvider.getAllPet().subscribe({
        next: (data: any) => {
          if (data != null && data.body != null) {
            var resultData = data.body.data; // Accede a la propiedad 'data'
            if (Array.isArray(resultData)) { // Verificar si resultData es un array
              this.petList = resultData;
            } else {
              console.error('Expected an array but got:', resultData);
              this.toastr.error('Unexpected data format', 'Error');
            }
          }
        },
        error: (error: any) => {
          console.error('Error fetching pets', error);
        },
        complete: () => {
          console.log('Fetch pets complete');
        }
      })
    }
    
    AddPet(){
      this.router.navigate(['AddPet']);
    }

    deletePetConfirmation(pet: any){
      this.modalService.open(MODALS['deleteModal'],
        {ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deletePet(pet);
        },
        (reason) => {});
    }
    deletePet(pet: any){
      this.httpProvider.deletePetById(pet.id).subscribe((data : any) => {
        if(data != null && data.body != null){
          var resultData = data.body;
          if(resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllPet();
          }
      }
    },
    (error : any) => {});
  }
  viewPet(petId: number) {
    this.router.navigate(['/ViewPet', petId]);
  }
}