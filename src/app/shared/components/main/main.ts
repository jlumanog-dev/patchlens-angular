import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api';
import { UserInterface } from '../../UserInterface';
import { Navbar } from '../navbar/navbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIcon } from "@angular/material/icon";
import { TopHeroesView } from '../../../features/heroes/top-heroes-view/top-heroes-view';
import { Router, RouterOutlet } from '@angular/router';
import { HeroInsightView } from '../../../features/heroes/hero-insight-view/hero-insight-view';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BasicHeroDataInterface } from '../../BasicHeroData';
import { HeroMappedInterface } from '../../HeroMappedInterface';
import { toSignal } from '@angular/core/rxjs-interop';

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
          this.username.set(response.username);
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
