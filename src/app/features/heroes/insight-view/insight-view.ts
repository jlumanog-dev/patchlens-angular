import { Component, inject, signal } from '@angular/core';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { ApiService } from '../../../core/services/api';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { RecentMatchAggregateInterface } from '../../../shared/RecentMatchAggregateInterface';
import { LineChartComponent } from "../../../shared/components/charts/line-chart-component/line-chart-component";
/* import { SlicePipe } from '@angular/common'; */

@Component({
  selector: 'app-insight-view',
  imports: [DoughnutChartComponent, MatCardModule, NgStyle, LineChartComponent],
  templateUrl: './insight-view.html',
  styleUrls: ['./insight-view.css', './insight-view-minmax-smaller.css', 'insight-view-larger.css']
})
export class InsightView {
  //localizedName = signal<string | undefined>("");
  apiService = inject(ApiService);
  heroesPlayed = signal<HeroesPlayedInterface[]>([{
    hero_id: 0,
    localized_name: "",
    last_played: 0,
    games: 0,
    win: 0,
    with_games: 0,
    with_win: 0,
    against_games: 0,
    against_wins: 0
  }, {
    hero_id: 0,
    localized_name: "",
    last_played: 0,
    games: 0,
    win: 0,
    with_games: 0,
    with_win: 0,
    against_games: 0,
    against_wins: 0
  }, {
    hero_id: 0,
    localized_name: "",
    last_played: 0,
    games: 0,
    win: 0,
    with_games: 0,
    with_win: 0,
    against_games: 0,
    against_wins: 0
  }]);

  recentMatches = signal<RecentMatchAggregateInterface>({
      match_list: [
        {
          match_id: 0,
          player_slot: 0,
          radiant_win: false,
          hero_id: 0,
          start_time: 0,
          duration: 0,
          game_mode: 0,
          lobby_type: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          average_rank: 0,
          xp_per_min: 0,
          gold_per_min: 0,
          hero_damage: 0,
          tower_damage: 0,
          hero_healing: 0,
          last_hits: 0,
          cluster: 0,
          hero_variant: 0,

          kdaRatio: 0,
          gpmXpmEfficiency: 0,
          csPerMinEfficiency: 0,
          heroDmgEfficiency: 0,
          towerDmgEfficiency: 0,
        }

      ],

      match_aggregate: {
        totalMatches: 0,
        winRate: 0,
        avgKDA: 0,
        avgGPM: 0,
        avgXPM: 0,
        avgHeroDamage: 0,
        avgTowerDamage: 0,
        avgLastHit: 0,
        avgLastHitPerMinute: 0,
      }
  });

  winRates = signal<number[]>([0,0,0]);

  ngOnInit(){
    this.apiService.getHeroesPlayedByUser().subscribe({
      next: (response: HeroesPlayedInterface[]) =>{
        this.heroesPlayed.set(response);
        console.log("winrate size: " + this.winRates.length);
        for(let i = 0; i < 3; i++){
          let wins = this.heroesPlayed()[i].win ?? 0;
          let games = this.heroesPlayed()[i].games ?? 0;
          this.winRates()[i] = (100 * (wins / games) );
        }

      },
      error: error=>{
        console.log("Error retreiving heroes played by user");
        console.log(error);
      }
    });

    this.apiService.getRecentMachesByUser().subscribe({
      next: (response: RecentMatchAggregateInterface) =>{
        console.log(response);
        this.recentMatches.set(response);
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  textColor(value: number): string{
    if(value >= 50){
      return "var(--success)";
    }else if(value >= 46){
      return "var(--accent-gold)";
    }else{
      return "var(--accent-red)";
    }
  }
}
