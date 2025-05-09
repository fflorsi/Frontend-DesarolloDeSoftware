import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {PetService} from 'app/services/pet.service';
import { Pet } from 'app/interfaces/pet.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  listPet: Pet[] = []

  constructor(private _petService: PetService) {}

  ngOnInit(): void {    
  }

}
