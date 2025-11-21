import { Component, inject, signal } from '@angular/core';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { ApiService } from '../../../core/services/api';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
/* import { SlicePipe } from '@angular/common'; */

@Component({
  selector: 'app-insight-view',
  imports: [DoughnutChartComponent, MatCardModule, NgStyle],
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
          console.log(this.heroesPlayed());
        }

      },
      error: error=>{
        console.log("Error retreiving heroes played by user");
        console.log(error);
      }
    });
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
