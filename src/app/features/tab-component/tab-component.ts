import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { TopHeroesView } from '../heroes/top-heroes-view/top-heroes-view';
import { HeroInsightView } from "../heroes/hero-insight-view/hero-insight-view";

@Component({
  selector: 'app-tab-component',
  imports: [MatTabsModule, MatIcon, TopHeroesView, HeroInsightView],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent {
  initialTabIndex: number = 0;

}
