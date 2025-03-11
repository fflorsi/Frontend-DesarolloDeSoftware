import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss'
})


export class MenuAdminComponent implements OnInit {
  private reloaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.reloaded) {
      this.reloaded = true;
      window.location.reload();
    }
  }
  
}
