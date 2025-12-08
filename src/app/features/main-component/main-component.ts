import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { TopHeroesView } from '../heroes/top-heroes-view/top-heroes-view';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { InsightView } from '../heroes/insight-view/insight-view';
import { RecentMatchAggregateInterface } from '../../shared/RecentMatchAggregateInterface';
import { ApiService } from '../../core/services/api';
import { DoughnutChartComponent } from '../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-main-component',
  imports: [MatTabsModule, MatIcon, TopHeroesView, InsightView, DoughnutChartComponent, MatCardModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {
  apiService = inject(ApiService);
  doughnutChartLabelSet : string[] = ["Total Lose", "Total Wins"];
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
          localized_name: '',
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
        cumulativeKDA: 0,
        avgGPM: 0,
        avgXPM: 0,
        avgHeroDamage: 0,
        avgTowerDamage: 0,
        avgLastHit: 0,
        avgLastHitPerMinute: 0,
      }
  });
  initialTabIndex: number = 0;
  ngOnInit(){
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
}
