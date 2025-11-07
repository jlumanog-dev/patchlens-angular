import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../core/services/api';
import { HeroMappedInterface } from '../../../shared/HeroMappedInterface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [MatCardModule, NgStyle],
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
          img: "",
          icon: "",
          base_str: 0,
          base_agi: 0,
          base_int: 0
        },
        winRate: 0,
        pickGrowthRateChange: 0
  });

  baseUrl = signal("http://cdn.dota2.com/");
  fullPath = computed(() => this.baseUrl() + this.heroData().heroStats.img);

  ngOnInit(){
    this.getHeroMethod();
  }

  getHeroMethod(){
    this.router.params.subscribe((param => {
      this.heroId.set(param['id']);
      console.log(this.heroId());
      this.apiService.getHeroData(this.heroId()).subscribe(response =>{
        console.log(response);
        this.heroData.set(response);
      });
    }))

  }
  textColor(value: number): string{
    if(value > 0){
      return "var(--success)";
    }
    return "var(--accent-red)";
  }
}
