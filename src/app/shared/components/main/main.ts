import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api';
import { UserInterface } from '../../UserInterface';
import { Navbar } from '../navbar/navbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIcon } from "@angular/material/icon";
import { TopHeroesView } from '../../../features/heroes/top-heroes-view/top-heroes-view';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  imports: [Navbar, MatTabsModule, MatIcon, TopHeroesView],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})

export class Main {
  apiService = inject(ApiService);
  router = inject(Router);
  username = signal('');


  constructor(){
    console.log("main component constructor");

    this.apiService.getUserData().subscribe({
        next: (response : UserInterface) =>{
          console.log(response);
          this.username.set(response.username);
          //this.username.set(response["username"]);
        },
        //Usually to check if JWT is expired
        error: (err)=>{
          console.log(err);
          this.router.navigate(['/login']);
        }
      });
  }
}
