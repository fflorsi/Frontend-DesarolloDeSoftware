import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'app/interfaces/user.js';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, 
    private _userService: UserService, 
    private router: Router,
    private _errorService: ErrorService) {

  }

  ngOnInit(): void {

  }

  login(){

    if(this.username==''||this.password==''){
      this.toastr.error('Todos los campos son obligatorios','Error');
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password
    }
    this.loading=true;
    this._userService.login(user).subscribe({
      next: (token) =>{
        localStorage.setItem('token',token)
        this.router.navigate(['/dashboard'])
        
        },
      error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading=false;
      }
    })

  }

  
}