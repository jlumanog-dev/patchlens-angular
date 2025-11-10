import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";
import { ApiService } from '../../../core/services/api';
import { HeroMappedInterface } from '../../../shared/HeroMappedInterface';
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

  heroes = signal<HeroMappedInterface[]>([{
        id: -1,
        localized_name: "",
        roles: [],
        attack_type: "",
        heroStats: {
          id : -1,
          localized_name : "",
          move_speed : 0,
          pub_pick : 0,
          pub_pick_trend : [],
          pub_win : 0,
          pub_win_trend : [],
          pro_pick: 0,
          pro_win: 0,
          img: "",
          icon: "",
          base_str: 0,
          base_agi: 0,
          base_int: 0
        },
        winRate: 0,
        pickGrowthRateChange: 0,
        winGrowthRateChange: 0,
        trendStdDev: 0
  }]);


  constructor(){
    this.apiService.getTopHeroes().subscribe({
      next: (response : HeroMappedInterface[]) =>{
        this.heroes.set(response.slice(0, response.length));
      },

      error: error =>{
        console.log("ERROR fetching top heroes");
        throw error;
      }
    })
  }

  textColor(value: number): string{
      if(value > 0){
        return "var(--success)";
      }
      return "var(--accent-red)";
  }
}
