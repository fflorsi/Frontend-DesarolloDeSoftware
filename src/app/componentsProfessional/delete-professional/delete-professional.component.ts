import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Client } from 'app/interfaces/client';
import {ClientService} from 'app/services/client.service'

@Component({
  selector: 'app-delete-professional',
  templateUrl: './delete-professional.component.html',
  styleUrl: './delete-professional.component.scss'
})
export class DeleteProfessionalComponent {  
  ngOnInit(): void {
  }
}