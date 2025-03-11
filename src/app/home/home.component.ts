import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
import { ClientDniModalComponent } from '../client-dni-modal/client-dni-modal.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  dni: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    //this.openClientDniModal();
  }

  openClientDniModal() {
    const modalRef = this.modalService.open(ClientDniModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then(
      (result) => {
        if (result === 'viewAllPets') {
          this.viewAllPets();
        } else {
          this.searchClientByDni(result);
        }
      },
      (reason) => {
      }
    );
  }

  searchClientByDni(dni: string) {
    this.httpProvider.getClientByDni(dni).subscribe({
      next: (data: any) => {
        if (data && data.body && data.body.ownerData) {
          const client = data.body.ownerData;
          const pets = data.body.petData;
          this.router.navigate(['ViewClientPet'], { state: { client, pets } });
        } else {
          this.toastr.error('Cliente no encontrado', 'Error');
        }
      },
      error: (error: any) => {
        console.error('Error fetching client by DNI', error);
        this.toastr.error('Error al buscar el cliente', 'Error');
      }
    });
  }

  viewAllPets() {
    this.router.navigate(['ViewAllPet']);
  }
}