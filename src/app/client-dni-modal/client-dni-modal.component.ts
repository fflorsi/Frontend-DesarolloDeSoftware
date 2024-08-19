// client-dni-modal.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-dni-modal',
  templateUrl: './client-dni-modal.component.html',
  styleUrls: ['./client-dni-modal.component.scss']
})
export class ClientDniModalComponent {
  dni: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  submit() {
    this.activeModal.close(this.dni);
  }

  viewAllPets() {
    this.activeModal.close('viewAllPets');
  }
}