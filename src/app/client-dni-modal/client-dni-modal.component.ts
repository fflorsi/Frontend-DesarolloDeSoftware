// client-dni-modal.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-dni-modal',
  templateUrl: './client-dni-modal.component.html',
  styleUrls: ['./client-dni-modal.component.scss']
})
export class ClientDniModalComponent {
  dni: string = '';

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal) {}

  submit() {
    this.activeModal.close(this.dni);
  }

  viewAllPets() {
    this.activeModal.close('viewAllPets');
  }

  viewAllProfessionals() {
    this.activeModal.close(); 
    this.router.navigate(['/viewAllProfessionals']); // La única forma en la que lo pude hacer para que me redireccione a AllProfessionals
  }

}