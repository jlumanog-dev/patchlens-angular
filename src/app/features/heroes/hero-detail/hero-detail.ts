import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../core/services/api';
import { HeroMappedInterface } from '../../../shared/HeroMappedInterface';
import { NgStyle } from '@angular/common';
import { LineChartComponent } from '../../../shared/components/charts/line-chart-component/line-chart-component';
import { DoughnutChartComponent } from '../../../shared/components/charts/doughnut-chart-component/doughnut-chart-component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  imports: [MatCardModule, NgStyle, LineChartComponent, DoughnutChartComponent, MatExpansionModule, MatIconModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css'
})
export class HeroDetail {
  router = inject(ActivatedRoute);
  apiService = inject(ApiService);

  heroId = signal(0);
  heroData = signal<HeroMappedInterface>({
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
          base_int: 0,

        },
        winRate: 0,
        pickGrowthRateChange: 0,
        winGrowthRateChange: 0,
        trendStdDev: 0,
        disparityScore: 0
  });

  baseUrl = signal("http://cdn.dota2.com/");
  fullPath = computed(() => this.baseUrl() + this.heroData().heroStats.img);

  fullText: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cum unde veniam eos perspiciatis! Odit atque tenetur ipsa nam non?';
  displayText = '';

/*   this is for the typing effect to have control over the interval async process
  so that typing can stop and reset the text when the user
  click the expansion-panel again to close it - manually stop async op using unsubscribe()*/
  typingEffectAsync?: Subscription;

  //MatExpansionPanel = used to close the expansion-panel when rendering another hero data.
  @ViewChild('expand') mat!: MatExpansionPanel;

  ngOnInit(){
    this.getHeroMethod();
  }

  expansionMethod(){
    this.typingEffectAsync?.unsubscribe(); // unsubscribe just in case the
    this.displayText = '';
    this.typingEffectAsync = interval(10).pipe(take(this.fullText.length)).subscribe(index => {
      this.displayText += this.fullText[index];
    });
  }

  getHeroMethod(){
    this.router.params.subscribe((param => {
      this.heroId.set(param['id']);
      this.apiService.getHeroData(this.heroId()).subscribe(response =>{
        this.heroData.set(response);
        this.mat.close(); //manually closing the expansion-panel when rendering new hero in case it was open before
      });
    }))

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
  growthRateColorSet(value: number): string{
    if(value > 0){
      return "var(--success)";
    }
    return "var(--accent-red)";
  }
}
