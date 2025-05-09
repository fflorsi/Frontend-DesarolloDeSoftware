import { Component, OnInit, ViewChild } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Facility } from '../../interfaces/facility';
import {FacilityService} from '../../services/facility.service'
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrl: './list-facilities.component.scss'
})
export class ListFacilitiesComponent implements OnInit{
  listFacilities: Facility[]=[];
  paginatedFacilities: Facility[]=[];
  loading: boolean=false;
  pageEvent?: PageEvent;
  searchTerm: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _facilityService: FacilityService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.getListFacilities();
  }

  getListFacilities(){
    this.loading=true;

    this._facilityService.getFacilities().subscribe((response: any) => {
      this.listFacilities = response.data; // Accede al array a través de response.data
      this.setPaginatedFacilities();
      this.loading = false;
    })
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

  deleteFacility(id: number) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este servicio?');
    if (confirmed) {
      this.loading = true;
      this._facilityService.deleteFacilityById(id).subscribe(() => {
        this.getListFacilities();
        this.toastr.warning('El servicio fue eliminado con éxito', 'Servicio eliminado');
      });
    }
  }

  filterFacilities() {
    // Llama al servicio para buscar facilities por nombre
    this._facilityService.searchFacilitiesByName(this.searchTerm).subscribe((response: any) => {
      this.listFacilities = response.data;
      this.setPaginatedFacilities(); // Actualiza la paginación
      this.paginator.pageIndex = 0; // Resetea el índice de la página
    }, error => {
      console.error('Error al buscar facilities:', error);
    });
  }  
}