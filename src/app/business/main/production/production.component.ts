import { Component, OnInit } from '@angular/core';
import {OrderList} from '../../../shared/http.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public orderList: OrderList[];
  public options = {

    tooltip : {
      trigger: 'axis',
      axisPointer
        :
        {
          type: 'cross',
          label
            :
            {
              backgroundColor: '#6a7985'
            }
        }
    }
    ,
    grid: {
      left: '3%',
      right
        :
        '4%',
      bottom
        :
        '-3px',
      containLabel
        :
        true
    }
    ,
    xAxis : [
      {
        type: 'category',
        height: '100%',
        boundaryGap: false,
        data: ['', '', '', '', '', '', ''],
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
    ],
    yAxis
      :
      [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        }
      ],
    series
      :
      [
        {
          name: '油漆厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '背漆厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '底漆厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        },

        {
          name: '铝板厚度',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
  };
  public ModalChart: any;
  constructor() {
    this.orderList = [
      new OrderList(1, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(2, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', false, '1h6m', '7h5m'),
      new OrderList(3, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(4, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', false, '1h6m', '7h5m'),
      new OrderList(5, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(6, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(7, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(8, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(9, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m'),
      new OrderList(10, '测试名', '信息', '1h5m', '2cm', '4cm', '32', '红色', '5cm', 'blue', '56cm', '灰色', '40cm', true, '1h6m', '7h5m')
    ];
  }

  ngOnInit() {}

  ReSize(event) {
    this.ModalChart = event;
  }
    ReSizeInit() {
      setTimeout(() => this.ModalChart.resize(), 500);
    }
  }
