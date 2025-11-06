import { Component, input, inject, ViewEncapsulation, model, WritableSignal, ModelSignal } from '@angular/core';
import { Router } from '@angular/router';
import { authenticationService } from '../../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from "@angular/material/icon";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BasicHeroDataInterface } from '../../BasicHeroData';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-navbar',
  imports: [
    MatButtonModule, MatMenuModule,
    MatIcon, MatAutocompleteModule,
    MatOption, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule, AsyncPipe,
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(authenticationService);
  router = inject(Router);
  username = input();

  SearchFormControl = new FormControl();
  //allHeroes = model<BasicHeroDataInterface[]>([]);

  allHeroes = input<BasicHeroDataInterface[]>([]);
  filteredHeroes = new Observable<BasicHeroDataInterface[]>;


  //Filter search with user input
  ngOnInit(){
    /*
    detect value change from input.
    map(input) is used to pass the current input value to 'input' and pass it to filterHandler.
    */
    this.filteredHeroes = this.SearchFormControl.valueChanges.pipe(startWith(''), map(input => this.filterHandler(input || '')))
  }

  //this handler will return a new filtered array of type BasicHeroDataInterface,
  //based on how close the user input is to a hero's localized_name
  filterHandler(input: string) : BasicHeroDataInterface[] {
    input = input.toLowerCase();
    return this.allHeroes().filter(currentList => currentList.localized_name.toLowerCase().includes(input));
  }

  optionSelected(name: any) : void {
    console.log(name);
    this.router.navigate(["/hero", name.localized_name]);
  }


  logoutMethod(){
    console.log("delete token");
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }
}
