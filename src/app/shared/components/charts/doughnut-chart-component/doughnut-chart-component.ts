import { Component, input, signal, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";

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
  heroId = input<number | undefined>(0);
  lastPlayed = input<number | undefined>(0);
  games = input<number | undefined>(0);
  win = input<number | undefined>(0);
  againstGames = input<number | undefined>(0);
  againstWins = input<number | undefined>(0);



  ngOnChanges(){
    if(this.totalWinsInput() > 0){
      this.totalWinsAndGames.set([(this.TotalGamesInput() - this.totalWinsInput()), this.totalWinsInput(), 0, 0]);
      this.totalProWinsAndGames.set([0, 0, (this.totalProPickInput() - this.totalProWinInput()), this.totalProWinInput()]);
      this.doughnutChartDataset[0].data = this.totalWinsAndGames();
      this.doughnutChartDataset[0].label = "Pub Games";
      this.doughnutChartDataset[1].data = this.totalProWinsAndGames();
      this.doughnutChartDataset[1].label = "Pro Games";

    }else if(this.heroId() != undefined){
      let win : any = this.win();
      let games : any = this.games();
      this.doughnutChartDataset[0].data = [games - win, win];
      this.doughnutChartDataset[0].label = "";
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
        position: 'right',
        labels:{
          padding: 20,
        }
      }
    }
  }
}
