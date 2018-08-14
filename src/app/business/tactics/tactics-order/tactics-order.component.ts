import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';
declare let myChart;
@Component({
  selector: 'app-tactics-order',
  templateUrl: './tactics-order.component.html',
  styleUrls: ['./tactics-order.component.css'],
  animations: [slideToRight]
})
export class TacticsOrderComponent implements OnInit {
  updateData: any;
  pipe: any;
  line: any;
  name = ['第一季度', '第二季度', '第三季度', '第四季度'];
  xAxisData = ['2012', '2013', '2014', '2015', '2016', '2017'];
  data = [
    [41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
    [86.5, 120.1, 85.7, 83.1, 73.4, 55.1],
    [24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
    [55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
  ];
  constructor() {

  }

  ngOnInit() {
    this.lineChart();
    this.pipeChart();
  }

  pipeChart() {
    this.pipe = {
      legend: {},
      backgroundColor: 'white',
      series: [
        {
          type: 'pie',
          label: {
            formatter: '{c}',
          },
          data: this.pieData(0)
        }
      ]
    };
  }
  lineChart() {
    this.line = {
      legend: {},
      backgroundColor: 'white',
      xAxis: {
        data: this.xAxisData
      },
      tooltip: {
        trigger: 'axis',
        showContent: false,
        formatter: '222',
        backgroundColor: ''
      },
      formatter: '{c}',
      yAxis: {gridIndex: 0},
      series: [
        {type: 'line', smooth: true, data: this.data[0]},
        {type: 'line', smooth: true, data: this.data[1]},
        {type: 'line', smooth: true, data: this.data[2]},
        {type: 'line', smooth: true, data: this.data[3]},
      ]
    };
  }

  pieData(index) {
    let amount = 0;
    for (let i = 0; i < 4; i++) {
      amount += this.data[i][index];
    }
    const data: Array<PieData> = [];
    for (let i = 0; i < 4; i++) {
      data[i] = {
        name: this.name[i] + ': ' + (this.data[i][index] / amount * 100).toFixed(2) + '%',
        value: this.data[i][index]
      };
    }
    return data;
  }
  chartMouseOver(event) {
    this.pipe.series[0].data = this.pieData(event.dataIndex);
    this.updateData = {
      series: this.pipe.series
    };
  }

}
class PieData {
  name: string;
  value: number;
}
