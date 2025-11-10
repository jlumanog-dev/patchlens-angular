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


  totalWinsInput = input(0);
  TotalGamesInput = input(0);
  totalProPickInput = input(0);
  totalProWinInput = input(0);
  totalWinsAndGames = signal<number[]>([]);
  totalProWinsAndGames = signal<number[]>([]);

  ngOnChanges(){
    this.totalWinsAndGames.set([(this.TotalGamesInput() - this.totalWinsInput()), this.totalWinsInput(), 0, 0]);
    this.totalProWinsAndGames.set([0, 0, (this.totalProPickInput() - this.totalProWinInput()), this.totalProWinInput()]);
    this.doughnutChartDataset[0].data = this.totalWinsAndGames();
    this.doughnutChartDataset[1].data = this.totalProWinsAndGames();
    this.chart?.update();
  }

  doughnutChartLabel: string []= ["Total Loses", "Total Wins", "Total Loses (Pro)", "Total Wins (Pro)"];

  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';

  doughnutChartDataset: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [0,0, 0, 0],
      label: "Pub Ranked Games",
      backgroundColor: ['#c43d2ebb', '#6BBF59', '#f56985ff', '#1e88e5']
    },
    {
      data: [0, 0, 0, 0],
      label: "Pro Games",
      backgroundColor: ['#c43d2ebb', '#6BBF59', '#f56985ff', '#1e88e5'],

    }
  ];

  //had to specify 'doughnut' to access 'coutout' property
  doughnutChartOption : ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
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
