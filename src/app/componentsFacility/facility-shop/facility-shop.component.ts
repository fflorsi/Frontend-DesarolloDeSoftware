import { Component, OnInit } from '@angular/core';
import { Facility } from '@app/interfaces/facility';
import { FacilityService } from '@app/services/facility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facility-shop',

  templateUrl: './facility-shop.component.html',
  styleUrl: './facility-shop.component.scss'
})
export class FacilityShopComponent implements OnInit {
  listFacilities: Facility[] = [];
  loading: boolean = false;

  constructor(private _facilityService: FacilityService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListFacilities();
  }

  getListFacilities() {
    this.loading = true;

    this._facilityService.getFacilities().subscribe((response: any) => {
      console.log('Respuesta del servidor:', response); // Para ver la estructura completa
      this.listFacilities = response.data; // Accede al array a través de response.data
      this.loading = false;
    })
  }
}
