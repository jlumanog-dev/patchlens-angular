import { Component, input, signal, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import { RecentMatchAggregateInterface } from '../../../RecentMatchAggregateInterface';

@Component({
  selector: 'app-doughnut-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart-component.html',
  styleUrl: './doughnut-chart-component.css'
})
export class DoughnutChartComponent {

  @ViewChild(BaseChartDirective) chart? : BaseChartDirective;

  doughnutChartLabel = input<string[]>([]);

  //this is for hero-details component
  totalWinsInput = input(0);
  TotalGamesInput = input(0);
  totalProPickInput = input(0);
  totalProWinInput = input(0);

  totalWinsAndGames = signal<number[]>([]);
  totalProWinsAndGames = signal<number[]>([]);

  //this is for heroes-insight-view
  doughnutChartLabelRecent = input<string[]>([]);
  recentMatchesInput = input<RecentMatchAggregateInterface>();
  totalWinSet = signal<number[]>([0, 0])


  ngOnChanges(){
    let win = 0;
    let total = 0;

    if(this.totalWinsInput() > 0){
      this.totalWinsAndGames.set([(this.TotalGamesInput() - this.totalWinsInput()), this.totalWinsInput(), 0, 0]);
      this.totalProWinsAndGames.set([0, 0, (this.totalProPickInput() - this.totalProWinInput()), this.totalProWinInput()]);
      this.doughnutChartDataset[0].data = this.totalWinsAndGames();
      this.doughnutChartDataset[1].data = this.totalProWinsAndGames();

    }else if(this.recentMatchesInput() != undefined){
      this.recentMatchesInput()?.match_list.forEach(element =>{
      total++; // somehow need to do this instead of .length property - doesn't have any value
         if(element.match_id == 0){
            return;
          }
          if(element.radiant_win && element.player_slot <= 127)
            win++;
          else if(element.radiant_win == false && element.player_slot >= 128)
            win++;
      });
      this.totalWinSet.set([win, (total - win), 0, 0]);
      this.doughnutChartDataset[0].data = this.totalWinSet();
    }
    this.chart?.update();
  }

  /* ["Total Loses", "Total Wins", "Total Loses (Pro)", "Total Wins (Pro)"]; */

  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';

  doughnutChartDataset: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [0,0, 0, 0],
      label: "Pub Ranked Games",
      backgroundColor: ['#C43C2E', '#6BBF59', '#f56985ff', '#1e88e5']
    },
    {
      data: [0, 0, 0, 0],
      label: "Pro Games",
      backgroundColor: ['#C43C2E', '#6BBF59', '#f56985ff', '#1e88e5'],
    }
  ];

  //had to specify 'doughnut' to access 'coutout' property
  doughnutChartOption : ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '40%',
    plugins:{
      legend: {
        position: "bottom",
        labels:{
          padding: 20,
        }
      }
    }
  }
}
