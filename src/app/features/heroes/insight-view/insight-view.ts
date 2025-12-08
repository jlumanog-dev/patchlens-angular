import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { ApiService } from '../../../core/services/api';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { RecentMatchAggregateInterface } from '../../../shared/RecentMatchAggregateInterface';
import { LineChartComponent } from "../../../shared/components/charts/line-chart-component/line-chart-component";
import { MostPlayedHeroesInterface } from '../../../shared/MostPlayedHeroesInterface';
import { interval, Subscription, take } from 'rxjs';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-insight-view',
  imports: [MatCardModule, LineChartComponent, MatExpansionModule, MatIconModule, NgStyle],
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
    heroes:[
      {
        localized_name: '',
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
        img: '',
        roles: []
      },
            {
        localized_name: '',
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
        img: '',
        roles: []
      },
            {
        localized_name: '',
        averageKills: 0,
        averageDeaths: 0,
        averageAssists: 0,
        img: '',
        roles: []
      },
    ]
  });

  fullText: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cum unde veniam eos perspiciatis! Odit atque tenetur ipsa nam non?';
  displayText = '';

  typingEffectAsync?: Subscription;

  @ViewChild('expand') mat!: MatExpansionPanel;


  expansionMethod(){
    this.typingEffectAsync?.unsubscribe(); // unsubscribe just in case
    this.displayText = '';
    this.typingEffectAsync = interval(10).pipe(take(this.fullText.length)).subscribe(index => {
      this.displayText += this.fullText[index];
    });
  }

  recentMatches = input<RecentMatchAggregateInterface>();

  winRates = signal<0[]>([0,0,0]);

  ngOnInit(){
    this.apiService.getHeroesPlayedByUser().subscribe({
      next: (response: HeroesPlayedInterface) =>{
        this.heroesPlayed.set(response);
        console.log(response);
        //can now sort hero_id by their frequency in a descending order
        const heroId = Object.keys(response.frequencyHeroes).sort((heroIdOne : any, heroIdTwo : any)=>
          response.frequencyHeroes[heroIdTwo] - response.frequencyHeroes[heroIdOne]
        );
        console.log(heroId);

        let topPlayedHeroesObject : MostPlayedHeroesInterface ={
          heroes:[{
              localized_name: '',
              averageKills: 0,
              averageDeaths: 0,
              averageAssists: 0,
              img: '',
              roles: []
            },
                  {
              localized_name: '',
              averageKills: 0,
              averageDeaths: 0,
              averageAssists: 0,
              img: '',
              roles: []
            },
                  {
              localized_name: '',
              averageKills: 0,
              averageDeaths: 0,
              averageAssists: 0,
              img: '',
              roles: []
            }]
        };
        for(let i = 0; i < 3; i++){
          let avgKills : number = 0;
          let avgDeaths : number = 0;
          let avgAssists: number = 0;
          let localizedName : string = '';
          let numberOfMatches: number = 0;
          let img : string = '';
          let role : string[] = [];
          response.recentMatches.forEach((object) => {
            if(object.hero_id == Number(heroId[i])){
              avgKills += object.kills;
              avgDeaths += object.deaths;
              avgAssists += object.assists;
              localizedName = object.localized_name;
              numberOfMatches += 1;
              img = object.img;
              role = object.roles;
            }
          });
          avgKills = avgKills / numberOfMatches;
          avgDeaths = avgDeaths / numberOfMatches;
          avgAssists = avgAssists / numberOfMatches;
          topPlayedHeroesObject.heroes[i] = ({
            localized_name: localizedName,
            averageKills: avgKills,
            averageDeaths: avgDeaths,
            averageAssists: avgAssists,
            img: img,
            roles: role
          });
        }

        this.mostPlayedHeroId.set(topPlayedHeroesObject);
        //this.mostPlayedHeroId.set(response.recentMatches);
        console.log(this.mostPlayedHeroId());
      },
      error: error=>{
        console.log("Error retreiving heroes played by user");
        console.log(error);
      }
    });
  }

  overallWinRateColorSet(value: number | undefined){
      if(value !== undefined){
        if(value >= 50){
              return "var(--success)";
            }else if(value >= 46){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            }
      }
      return 0;
  }

  kdaColorSet(value: number | undefined){
      if(value !== undefined){
        if(value >= 4.0){
              return "var(--success)";
            }else if(value >= 2.0){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            }
      }
      return 0;
  }


  gpmColorSet(value: number | undefined){
      if(value !== undefined){
/*         if(value >= 500){
              return "var(--success)";
            }else if(value >= 350){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            } */
        if(value >= 500){
              return "var(--success)";
        }else {
          return "var(--accent-gold)";
        }
      }
      return 0;
  }
  lastHitColorSet(value: number | undefined){
      if(value !== undefined){
/*         if(value >= 350){
              return "var(--success)";
            }else if(value >= 200){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            } */
        if(value >= 350){
          return "var(--success)";
        }else{
          return "var(--accent-gold)";
        }
      }
      return 0;
  }
  avgPerMinlastHitColorSet(value: number | undefined){
      if(value !== undefined){
/*         if(value >= 6.5){
              return "var(--success)";
            }else if(value >= 4){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            } */
           if(value >= 6.5){
              return "var(--success)";
            }else{
              return "var(--accent-gold)";
            }
      }
      return 0;
  }

  xpmColorSet(value: number | undefined){
      if(value !== undefined){
        if(value >= 6.5){
              return "var(--success)";
            }else if(value >= 4){
              return "var(--accent-gold)";
            }else{
              return "var(--accent-red)";
            }
      }
      return 0;
  }
}
