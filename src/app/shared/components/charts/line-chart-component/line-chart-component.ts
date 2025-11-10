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
  pub_win_trend = input<number[]>([]);
  pub_win_trend_array = signal<number[]>([]);

  pub_pick_trend = input<number[]>([]);
  pub_pick_trend_array = signal<number[]>([]);


  /* definite assign operator (!) tells angular the 'chart' will get assigned later
  chart is used to updated the line chart on ngOnChanegs */
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  chartType: ChartConfiguration<'line'>['type'] = 'line';


  ngOnChanges(){
    //unwrapping value from an angular signal to a standard JS array to assign it to a property.
    this.pub_pick_trend_array.set(this.pub_pick_trend());
    this.pub_win_trend_array.set(this.pub_win_trend());
    this.lineChartData.datasets[0].data = this.pub_win_trend_array();
    this.lineChartData.datasets[1].data = this.pub_pick_trend_array();
    this.chart?.update();
  }


  lineChartData: ChartConfiguration['data'] = {
    labels: ['1','2','3','4','5','6'],   // match array length
    datasets: [
      {
        data: [],
        label: 'Win Trend',
        fill: false,
      },
      {
        data: [],
        label: 'Pick Trend',
        fill: false,
      },
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
