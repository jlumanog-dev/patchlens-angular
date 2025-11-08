import { Component, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-line-chart-component',
  imports: [BaseChartDirective],
  templateUrl: './line-chart-component.html',
  styleUrl: './line-chart-component.css'
})
export class LineChartComponent {
  pub_win_trend = input<number[]>([0,0,0,0,0,0]);
  pub_pick_trend = input<number[]>([]);

  //unwrapping value from an angular signal to a standard JS array to assign it to a property.
  pub_win_trend_array: number[] = this.pub_win_trend();
  pub_pick_trend_array: number[] = this.pub_pick_trend();

  ngOnInit(){
    console.log(this.pub_pick_trend_array);
  }

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['1','2','3','4','5','6'],   // match array length
    datasets: [
      {
        data: this.pub_win_trend_array,
        label: 'Win Trend',
        fill: true,
      },
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };


}
