import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authenticationService } from '../../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatFormFieldModule, MatMenuModule, MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  username = input();
  authService = inject(authenticationService);
  router = inject(Router);


    logoutMethod(){
      console.log("delete token");
      this.authService.deleteToken();
      this.router.navigate(['login']);
    }
}
