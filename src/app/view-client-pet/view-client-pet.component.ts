import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-client-pet',
  templateUrl: './view-client-pet.component.html',
  styleUrls: ['./view-client-pet.component.scss']
})
export class ViewClientPetComponent implements OnInit {
  client: any;
  pets: any[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { client: any, pets: any[] };
    this.client = state.client;
    this.pets = state.pets;
  }

  ngOnInit(): void {
    console.log('Client:', this.client);
    console.log('Pets:', this.pets);
  }
}