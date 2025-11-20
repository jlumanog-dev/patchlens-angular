import { Component, inject, signal } from '@angular/core';
import { HeroesInterface } from '../../../shared/HeroesInterface';
import {MatCardModule} from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";
import { ApiService } from '../../../core/services/api';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-top-heroes-view',
  imports: [MatCardModule, MatAnchor, NgStyle],
  templateUrl: './top-heroes-view.html',
  styleUrl: './top-heroes-view.css'
})
export class TopHeroesView {
  private apiService = inject(ApiService);
/*   heroOne = signal<topHeroesMapped>({id: 0, heroStats: {}});
  heroTwo = signal<topHeroesMapped>();
  heroThree = signal<topHeroesMapped>(); */

  heroes = signal<HeroesInterface[]>([]);


  constructor(){
    this.apiService.getTopHeroes().subscribe({
      next: (response : HeroesInterface[]) =>{
        this.heroes.set(response.slice(0, response.length));
        console.log(this.heroes());
      },

      error: error =>{
        console.log("ERROR fetching top heroes");
        throw error;
      }
    })
  }

  textColor(value: number): string{
      if(value >= 0){
        return "var(--success)";
      }else
      return "var(--accent-red)";
  }
}
