import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacilityService } from '@app/services/facility.service';
import { Facility } from '@app/interfaces/facility';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-facility',
  templateUrl: './detail-facility.component.html',
  styleUrl: './detail-facility.component.scss'
})
export class DetailFacilityComponent {
  facilityData!: Facility;

  constructor(
    private _facilityService: FacilityService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const facilityId = Number(this.route.snapshot.paramMap.get('id'));
    this._facilityService.getFacilityById(facilityId).subscribe(
        (response: any) => {  
            this.facilityData = response.data;  
        },
        (error) => {
            console.error('Error fetching facility data', error);
        }
    );
  }
  deleteFacility(id: number) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta instalación?');
    if (confirmed) {
      this._facilityService.deleteFacilityById(id).subscribe(() => {
        this.toastr.warning('El servicio fue eliminado con éxito', 'Servicio eliminado');
      });
    }
  }
}
