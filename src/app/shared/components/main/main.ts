import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { authenticationService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api';
import { UserInterface } from '../../UserInterface';




@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  authService = inject(authenticationService);
  apiService = inject(ApiService);
  router = inject(Router);

  username = signal('');

  logoutMethod(){
    console.log("delete token");
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }

  constructor(){
    this.apiService.getUserData().subscribe((response : UserInterface) =>{
      this.username.set(response.username);
      //this.username.set(response["username"]);
    })
  }
}
