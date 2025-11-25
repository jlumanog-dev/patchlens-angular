import { Component, input, signal, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './line-chart-component.html',
  styleUrl: './line-chart-component.css'
})
export class LineChartComponent {
  usedBy = input('');

  //inputs and signals for hero-detail
  pub_win_trend = input<number[]>([]);
  pub_pick_trend = input<number[]>([]);
  lineChartLabel = input<string[]>([]);

  //inputs and signals for insights-view



  /* definite assign operator (!) tells angular the 'chart' will get assigned later
  chart is used to updated the line chart on ngOnChanegs */
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  chartType: ChartConfiguration<'line'>['type'] = 'line';


  ngOnChanges(){

    switch(this.usedBy()){
      case 'hero-detail':
        this.lineChartData = {
          labels: [...this.lineChartLabel()],   // match array length
          datasets: [
            {
              data: [],
              label: '',
              fill: false,
            },
            {
              data: [],
              label: '',
              fill: false,
            }
          ]
        }
        this.lineChartData.datasets[0].data = [...this.pub_win_trend()];
        this.lineChartData.datasets[0].label = 'Win Trend!';
        this.lineChartData.datasets[1].data = [...this.pub_pick_trend()];
        this.lineChartData.datasets[1].label = 'Pick Trend!';
        this.chart?.update();
        break;
      case 'insight-view':

        break;
    }

  }


  lineChartData: ChartConfiguration['data'] = {
    labels: [],   // match array length
    datasets: [
    ]
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      legend: {
        maxHeight: 100
      }
    }
  };

}
