import { Component, inject, signal } from '@angular/core';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { ApiService } from '../../../core/services/api';
import { MatCardModule } from '@angular/material/card';
/* import { SlicePipe } from '@angular/common'; */

@Component({
  selector: 'app-hero-insight-view',
  imports: [DoughnutChartComponent, MatCardModule],
  templateUrl: './hero-insight-view.html',
  styleUrls: ['./hero-insight-view.css', './hero-insight-view-minmax-smaller.css', 'hero-insight-view-larger.css']
})
export class HeroInsightView {
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

  ngOnInit(){
    this.apiService.getHeroesPlayedByUser().subscribe({
      next: (response: HeroesPlayedInterface[]) =>{
        this.heroesPlayed.set(response);
        console.log(this.heroesPlayed());
      },
      error: error=>{
        console.log("Error retreiving heroes played by user");
        console.log(error);
      }
    });
  }

}
