import { Component, OnInit } from '@angular/core';
import { Facility } from '@app/interfaces/facility';
import { FacilityService } from '@app/services/facility.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-facility-shop',
  templateUrl: './facility-shop.component.html',
  styleUrls: ['./facility-shop.component.scss']
})
export class FacilityShopComponent implements OnInit {
  listFacilities: Facility[] = [];
  paginatedFacilities: Facility[] = [];
  loading: boolean = false;
  paginator = {
    pageIndex: 0,
    pageSize: 6
  };
  pageEvent?: PageEvent;

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
      this.setPaginatedFacilities(); // Llama a setPaginatedFacilities después de actualizar listFacilities
    });
  }

  setPaginatedFacilities() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedFacilities = this.listFacilities.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedFacilities();
  }
}