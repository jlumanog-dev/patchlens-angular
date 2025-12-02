import { Component, inject, input, signal } from '@angular/core';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { ApiService } from '../../../core/services/api';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { RecentMatchAggregateInterface } from '../../../shared/RecentMatchAggregateInterface';
import { LineChartComponent } from "../../../shared/components/charts/line-chart-component/line-chart-component";
import { MostPlayedHeroesInterface } from '../../../shared/MostPlayedHeroesInterface';
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
  heroesPlayed = signal<HeroesPlayedInterface>({
    frequencyHeroes: [

    ],
    recentMatches: [{
        match_id: 0,
        player_slot: 0,
        radiant_win: false,
        game_mode: 0,
        duration: 0,
        lobby_type: 0,
        hero_id: 0,
        start_time: 0,
        version: null,
        kills: 0,
        deaths: 0,
        assists: 0,
        average_rank: 0,
        leaver_status: 0,
        party_size: null,
        hero_variant: 0,

        img: '',
        roles:[],
        localized_name: '',
      }]
  });

  mostPlayedHeroId = signal<MostPlayedHeroesInterface>({
    localized_name: '',
    averageKills: 0,
    averageDeaths: 0,
    averageAssists: 0,
    img: '',
    roles: []
  });

  recentMatches = input<RecentMatchAggregateInterface>();

  winRates = signal<0[]>([0,0,0]);

  ngOnInit(){
    this.apiService.getHeroesPlayedByUser().subscribe({
      next: (response: HeroesPlayedInterface) =>{
        this.heroesPlayed.set(response);
        console.log(response);
        const heroId = Object.keys(response.frequencyHeroes).reduce((heroIdOne : any, heroIdTwo : any)=>
          response.frequencyHeroes[heroIdOne] > response.frequencyHeroes[heroIdTwo] ? heroIdOne : heroIdTwo
        );
        let avgKills : number = 0;
        let avgDeaths : number = 0;
        let avgAssists: number = 0;
        let localizedName : string = '';
        let numberOfMatches: number = 0;
        let img : string = '';
        let role : string[] = [];
        response.recentMatches.forEach((object) => {
          if(object.hero_id == Number(heroId)){
            avgKills += object.kills;
            avgDeaths += object.deaths;
            avgAssists += object.assists;
            localizedName = object.localized_name;
            numberOfMatches += 1;
            console.log("KILLS: " + avgKills);
            console.log("numberOfMatch" + numberOfMatches);
            img = object.img;
            role = object.roles;
          }
        });
        avgKills = avgKills / numberOfMatches;
        avgDeaths = avgDeaths / numberOfMatches;
        avgAssists = avgAssists / numberOfMatches;
        this.mostPlayedHeroId.set({
          localized_name: localizedName,
          averageKills: avgKills,
          averageDeaths: avgDeaths,
          averageAssists: avgAssists,
          img: img,
          roles: role
        })
        //this.mostPlayedHeroId.set(response.recentMatches);
        console.log(this.mostPlayedHeroId());
      },
      error: error=>{
        console.log("Error retreiving heroes played by user");
        console.log(error);
      }
    });
  }

  ngOnChanges(){
  }

  textColor(value: 0): string{
    if(value >= 50){
      return "var(--success)";
    }else if(value >= 46){
      return "var(--accent-gold)";
    }else{
      return "var(--accent-red)";
    }
  }
}
