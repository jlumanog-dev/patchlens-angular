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
  totalWinsAndGames = signal<number[]>([]);

  ngOnChanges(){
    this.totalWinsAndGames.set([(this.TotalGamesInput() - this.totalWinsInput()), this.totalWinsInput()]);
    this.doughnutChartDataset[0].data = this.totalWinsAndGames();
    this.chart?.update();
  }

  doughnutChartLabel: string []= ["Total Lose", "Total Wins"];

  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';

  doughnutChartDataset: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [50,50],
/*       backgroundColor: [
            '#6BBF59',
            'rgb(54, 162, 235)'
          ], */
    }
  ];

  //had to specify 'doughnut' to access 'coutout' property
  doughnutChartOption : ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '80%'
  }
}
