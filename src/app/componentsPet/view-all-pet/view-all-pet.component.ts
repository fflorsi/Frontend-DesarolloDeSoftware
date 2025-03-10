import { Component, OnInit, Type } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PetService } from '@app/services/pet.service';
import { Pet } from '@app/interfaces/pet';


@Component({
  selector: 'app-view-all-pet',
  templateUrl: './view-all-pet.component.html',
  styleUrls: ['./view-all-pet.component.scss']
})
export class ViewAllPetComponent implements OnInit {

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

  deletePet(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta mascota?')) {
      this.loading = true;
      this._petService.deletePetById(id).subscribe(() => {
        this.getPetList();
        this.toastr.warning('La mascota fue eliminada con éxito', 'Mascota eliminada');
      });
    }
  }
}