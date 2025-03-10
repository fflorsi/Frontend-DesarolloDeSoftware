import { Component, OnInit, Type } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PetService } from '@app/services/pet.service';
import { Pet } from '@app/interfaces/pet';

@Component({
  selector: 'app-pets-medical-history-list',
  templateUrl: './pets-medical-history-list.component.html',
  styleUrl: './pets-medical-history-list.component.scss'
})
export class PetsMedicalHistoryListComponent {
petList: Pet[] = [];
  loading: boolean = false;

  constructor(
    private _petService: PetService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getPetList();
  }

  getPetList() {
    this.loading = true;
    this._petService.getPets().subscribe((response: any) => {
      console.log('Respuesta del servidor:', response);
      this.petList = response.data;
      this.loading = false;
    });
  }
}
