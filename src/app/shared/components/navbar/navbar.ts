import { Component, input, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { authenticationService } from '../../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from "@angular/material/icon";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatFormFieldModule, MatMenuModule, MatIcon, MatAutocompleteModule, MatOption, MatInputModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(authenticationService);
  router = inject(Router);
  username = input();
  filteredOptions = ['option 1', 'option 2', 'option 3'];


    logoutMethod(){
      console.log("delete token");
      this.authService.deleteToken();
      this.router.navigate(['login']);
    }
}
