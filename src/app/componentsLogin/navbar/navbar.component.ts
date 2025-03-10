import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  
  constructor(private router: Router){}

  ngOnInit(): void {
    
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
