import { Component, input, signal, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
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


  //definite assign operator (!) tells angular the 'chart' will get assigned later
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  ngOnChanges(){
    //unwrapping value from an angular signal to a standard JS array to assign it to a property.
    this.pub_pick_trend_array.set(this.pub_pick_trend());
    this.pub_win_trend_array.set(this.pub_win_trend());
    console.log(this.pub_win_trend_array());
    this.lineChartData.datasets[0].data = this.pub_win_trend_array();
    this.lineChartData.datasets[1].data = this.pub_pick_trend_array();
    this.chart?.update();
  }


  lineChartData: ChartConfiguration['data'] = {
    labels: ['1','2','3','4','5','6', '7'],   // match array length
    datasets: [
      {
        data: this.pub_win_trend_array(),
        label: 'Win Trend',
        fill: false,
      },
      {
        data: this.pub_pick_trend_array(),
        label: 'Pick Trend',
        fill: false,
      },
    ]
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales:{
      y:{
        
      }
    }
  };

  chartType: ChartType = 'line';


}
