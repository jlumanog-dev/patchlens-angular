import { Component, inject, Signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { TopHeroesView } from '../heroes/top-heroes-view/top-heroes-view';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { InsightView } from '../heroes/insight-view/insight-view';

@Component({
  selector: 'app-tab-component',
  imports: [MatTabsModule, MatIcon, TopHeroesView, InsightView],
  templateUrl: './tab-component.html',
  styleUrl: './tab-component.css'
})
export class TabComponent {
  initialTabIndex: number = 0;
  ngOnInit(){
    console.log("on tab-component");

  }
}
