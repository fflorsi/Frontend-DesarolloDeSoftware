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
  searchTerm: string = '';

  constructor(private _facilityService: FacilityService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListFacilities();
  }

  getListFacilities() {
    this.loading = true;

    this._facilityService.getFacilities().subscribe((response: any) => {
      this.listFacilities = response.data;
      this.loading = false;
      this.setPaginatedFacilities();
    });
  }

  setPaginatedFacilities() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedFacilities = this.listFacilities.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedFacilities();
  }

  filterFacilities() {
   Llama al servicio para buscar facilities por nombre
    this._facilityService.searchFacilitiesByName(this.searchTerm).subscribe((response: any) => {
      this.listFacilities = response.data;
      this.setPaginatedFacilities(); // Actualiza la paginación
      this.paginator.pageIndex = 0; // Resetea el índice de la página
    }, error => {
      console.error('Error al buscar facilities:', error);
    });
  }
}