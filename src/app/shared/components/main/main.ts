import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api';
import { UserInterface } from '../../UserInterface';
import { Navbar } from '../navbar/navbar';

import { Router, RouterOutlet } from '@angular/router';
import { BasicHeroDataInterface } from '../../BasicHeroData';


@Component({
  selector: 'app-main',
  imports: [
    Navbar,
    RouterOutlet
],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})

export class Main {
  apiService = inject(ApiService);
  router = inject(Router);
  username = signal('');
  heroes = signal<BasicHeroDataInterface[]>([]);

  constructor(){
    console.log("main component constructor");

    this.apiService.getUserData().subscribe({
        next: (response : UserInterface) =>{
          console.log(response);
          this.username.set(response.personaName);
          //this.username.set(response["username"]);
        },
        //Usually to check if JWT is expired
        error: (err)=>{
          console.log(err);
          this.router.navigate(['/login']);
        }
      });

    this.apiService.getAllHeroesData().subscribe({
      next: (response : BasicHeroDataInterface[]) =>{
        this.heroes.set(response.slice(0, response.length));
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}
