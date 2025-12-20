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

  heroes = signal<HeroesInterface[]>([{
    id: 0,
    localized_name: '',
    roles: [],
    attack_type: '',
    primary_attr: '',

    base_str: 0,
    base_agi: 0,
    base_int: 0,
    move_speed: 0,

    pub_pick_trend: [],
    pub_win_trend: [],
    pub_pick: 0,
    pub_win: 0,
    pro_pick: 0,
    pro_win: 0,

    winRate: 0.0000,
    pickGrowthRateChange: 0,
    winGrowthRateChange: 0,
    trendStdDev: 0.000000,
    disparityScore: 0.0000,

    img: '',
    icon: '',
    insight: [
      {
        text: ''
      }
    ]
  }
]);


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
  overallWinRateColorSet(value: number){
    if(value >= 50){
      return "var(--success)";
    }else if(value >= 46){
      return "var(--accent-gold)";
    }else{
      return "var(--accent-red)";
    }
  }
}
