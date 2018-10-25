import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';
import {TacticsOrderService} from './tactics-order.service';
import {LoginIdService} from '../../../login/login-id.service';
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
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  name = ['第一季度', '第二季度', '第三季度', '第四季度'];
  productionsXAxis = [];
  productionsData = [[], [], [], []];
  salesXAxis = [];
  salesData = [[], [], [], []];
  xAxisData = ['2012', '2013', '2014', '2015', '2016', '2017'];
  data = [
    [41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
    [86.5, 120.1, 85.7, 83.1, 73.4, 55.1],
    [24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
    [55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
  ];
  constructor(private http: TacticsOrderService, private user: LoginIdService) {
    this.initData();
  }

  initData() {
    for ( let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystemName === this.proSystem[i]['sysName']) {
        this.http.findTotalProduct(this.proSystem[i]['sysId'])
          .subscribe(data => {
            console.log(data);
            this.initProductions(data['values']['totalProductions']);
            console.log(this.productionsData, this.productionsXAxis);
            this.initSales(data['values']['totalSales']);
            console.log(this.salesData, this.salesXAxis);
            this.data = this.productionsData;
            this.xAxisData = this.productionsXAxis;
            this.lineChart();
            this.pipeChart();
          });
      }
    }
  }
  ngOnInit() {

  }

  pipeChart() {
    this.pipe = {
      legend: {},
      backgroundColor: '#269b97',
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
      backgroundColor: '#1F9B8F',
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

  initProductions(data: Array<any>) {
    let year, j = 0;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        year = Number(data[i]['year']);
        this.productionsXAxis[j] = year;
        this.productionsData[0][j] = 0;
        this.productionsData[1][j] = 0;
        this.productionsData[2][j] = 0;
        this.productionsData[3][j] = 0;
        j++;
        this.initProductionsData(Number(data[i]['month']), data[i]['totalProduction'], j - 1);
      } else if (year !== Number(data[i]['year'])) {
        year = Number(data[i]['year']);
        this.productionsXAxis[j] = year;
        this.productionsData[0][j] = 0;
        this.productionsData[1][j] = 0;
        this.productionsData[2][j] = 0;
        this.productionsData[3][j] = 0;
        j++;
        this.initProductionsData(Number(data[i]['month']), data[i]['totalProduction'], j - 1);
      } else {
        this.initProductionsData(Number(data[i]['month']), data[i]['totalProduction'], j - 1);
      }
    }
  }
  initProductionsData(month: number, data: number, index: number) {
    switch (month) {
      case 1: case 2: case 3:
        this.productionsData[0][index] += data; break;
      case 4: case 5: case 6:
      this.productionsData[1][index] += data; break;
      case 7: case 8: case 9:
      this.productionsData[2][index] += data; break;
      case 10: case 11: case 12:
      this.productionsData[3][index] += data; break;
    }
  }

  initSales(data: Array<any>) {
    let year, j = 0;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        year = Number(data[i]['year']);
        this.salesXAxis[j] = year;
        this.salesData[0][j] = 0;
        this.salesData[1][j] = 0;
        this.salesData[2][j] = 0;
        this.salesData[3][j] = 0;
        j++;
        this.initSalesData(Number(data[i]['month']), data[i]['totalSales'], j - 1);
      } else if (year !== Number(data[i]['year'])) {
        year = Number(data[i]['year']);
        this.salesXAxis[j] = year;
        this.salesData[0][j] = 0;
        this.salesData[1][j] = 0;
        this.salesData[2][j] = 0;
        this.salesData[3][j] = 0;
        j++;
        this.initSalesData(Number(data[i]['month']), data[i]['totalSales'], j - 1);
      } else {
        this.initSalesData(Number(data[i]['month']), data[i]['totalSales'], j - 1);
      }
    }
  }
  initSalesData(month: number, data: number, index: number) {
    switch (month) {
      case 1: case 2: case 3:
      this.salesData[0][index] += data; break;
      case 4: case 5: case 6:
      this.salesData[1][index] += data; break;
      case 7: case 8: case 9:
      this.salesData[2][index] += data; break;
      case 10: case 11: case 12:
      this.salesData[3][index] += data; break;
    }
  }
}
class PieData {
  name: string;
  value: number;
}
