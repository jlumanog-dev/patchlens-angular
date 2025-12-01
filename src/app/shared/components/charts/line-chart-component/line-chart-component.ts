import { ArrayType } from '@angular/compiler';
import { Component, input, Signal, signal, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RecentMatchAggregateInterface } from '../../../RecentMatchAggregateInterface';

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
  matchList = input<RecentMatchAggregateInterface>();
  matchLabels = signal<string[]>([]);
  gpm = signal<number[]>([]);
  lastHits = signal<number[]>([]);
  xpm = signal<number[]>([]);
  heroDamageEfficiency = signal<number[]>([]);


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
        //Have to reverse the match_list. Somehow the latest match is at the first
        //index after passing it here in this line chart
        this.matchList()?.match_list.reverse().forEach(element =>{
          //skip the default values
          if(element.match_id == 0){
            return;
          }
          if(element.radiant_win && element.player_slot <= 127){
            this.matchLabels.update(currentLabels =>
              [...currentLabels, 'Radiant (W)']
            );
          }else if(element.radiant_win == false && element.player_slot >= 128){
            this.matchLabels.update(currentLabels =>
              [...currentLabels, 'Dire (W)']
            );
          }else if (element.radiant_win && element.player_slot >= 128 ){
            this.matchLabels.update(currentLabels =>
              [...currentLabels, 'Dire (L)']
            );
          }else if(element.radiant_win == false && element.player_slot <= 127){
            this.matchLabels.update(currentLabels =>
              [...currentLabels, 'Radiant (L)']
            );
          }
          this.gpm?.update(currentGpmList => [...currentGpmList, element.gold_per_min]);
          this.lastHits?.update(currentCsPerMinList => [...currentCsPerMinList, element.last_hits]);
          this.xpm?.update(currentXpmList => [...currentXpmList, element.xp_per_min]);
          //this.KDARatio?.update(currentKdaRatioList => [...currentKdaRatioList, element.kdaRatio]);
          //this.heroDamageEfficiency?.push(element.heroDmgEfficiency);
        })
        console.log(this.matchLabels());
        this.lineChartData = {
          labels: [...this.matchLabels()],
          datasets: [ {
              data: [],
              label: '',
              fill: false,
            },{
              data: [],
              label: '',
              fill: false,
            },{
              data: [],
              label: '',
              fill: false,
            }
          ]
        }
        this.lineChartData.datasets[0].data = [...this.lastHits()]
        this.lineChartData.datasets[0].label = 'Total Last hits';
        this.lineChartData.datasets[1].data = [...this.gpm()]
        this.lineChartData.datasets[1].label = 'Gold per Minute';
        this.lineChartData.datasets[2].data = [...this.xpm()]
        this.lineChartData.datasets[2].label = 'XP per Minute';


/*         this.lineChartData.datasets[2].data = [...this.KDARatio()]
        this.lineChartData.datasets[2].label = 'KDA Ratio per Match'; */

        //damage values are too big in comparison to other metrics
        /* this.lineChartData.datasets[3].data = [...this.heroDamageEfficiency];
        this.lineChartData.datasets[3].label = 'Hero Damage Efficiency'; */
        this.chart?.update();
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
