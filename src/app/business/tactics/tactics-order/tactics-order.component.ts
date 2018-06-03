import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-tactics-order',
  templateUrl: './tactics-order.component.html',
  styleUrls: ['./tactics-order.component.css'],
  animations: [slideToRight]
})
export class TacticsOrderComponent implements OnInit {
  @HostBinding('@routerAnimate') state;

  dataMap = {'dataMonth': {}};
  temp: any;
  option: any;
  options: any;
  pList = [];
  constructor() {
    this.pList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
      '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  }

  dataFormatter(obj) {

    for (let month = 1; month <= 12; month++) {

      this.temp = obj[month.toString()];
      obj[month + 'sum'] = this.temp[0];
      for (let i = 1, len = this.temp.length; i < len; i++) {
        obj[month.toString()][i] = {
          name : this.pList[i],
          value : this.temp[i]
        };
      }
      obj[month.toString()].shift();

    }
    return obj;
  }
  ngOnInit() {

    this.dataMap.dataMonth = this.dataFormatter({
      // max : 60000,
      '1': [1020, 45, 45, 34, 25, 43, 37, 31, 32, 26, 33, 25, 35, 23, 25, 39, 31, 32, 48, 37, 33, 35, 32, 34, 25, 28, 35, 44, 36, 26, 26, 20],
      '2': [928, 39, 42, 27, 29, 39, 36, 34, 38, 25, 30, 31, 34, 29, 35, 32, 28, 29, 37, 27, 47, 25, 25, 30, 31, 33, 42, 27, 39, 8, 0, 0],
      '3': [1024, 29, 26, 37, 48, 41, 34, 26, 45, 21, 39, 35, 37, 41, 29, 32, 34, 25, 39, 24, 35, 34, 36, 29, 25, 35, 32, 31, 45, 30, 29, 21],
      '4': [878, 26, 34, 24, 31, 36, 20, 24, 28, 30, 25, 22, 32, 28, 32, 28, 27, 34, 34, 30, 39, 36, 16, 26, 36, 34, 26, 34, 26, 26, 34, 0],
      '5': [902, 28, 27, 38, 26, 22, 32, 28, 39, 36, 31, 35, 20, 29, 27, 36, 25, 23, 24, 26, 35, 21, 27, 41, 30, 33, 26, 27, 30, 31, 30, 19],
      '6': [914, 31, 29, 31, 30, 34, 40, 32, 38, 16, 31, 27, 25, 28, 27, 28, 28, 33, 36, 23, 34, 36, 33, 31, 31, 30, 26, 35, 30, 34, 27, 0],
      '7': [1070, 31, 35, 36, 34, 29, 36, 28, 49, 28, 33, 36, 32, 36, 31, 47, 30, 41, 41, 43, 33, 24, 38, 40, 33, 32, 35, 21, 43, 38, 33, 24],
      '8': [1342, 47, 35, 26, 32, 40, 40, 31, 63, 37, 44, 37, 40, 41, 41, 48, 50, 36, 65, 44, 51, 40, 41, 51, 36, 39, 63, 55, 59, 32, 38, 40],
      '9': [1157, 32, 34, 33, 29, 39, 44, 32, 33, 33, 57, 36, 31, 41, 32, 36, 36, 42, 49, 45, 55, 37, 34, 35, 36, 43, 55, 34, 42, 34, 38, 0],
      '10': [1185, 45, 46, 33, 29, 50, 31, 40, 57, 33, 49, 34, 50, 31, 34, 33, 31, 32, 36, 33, 51, 49, 41, 30, 32, 48, 45, 39, 41, 30, 28, 24],
      '11': [1116, 45, 39, 42, 38, 34, 41, 38, 39, 39, 36, 28, 32, 37, 30, 38, 56, 36, 46, 34, 37, 23, 31, 40, 35, 35, 44, 42, 51, 24, 26, 0],
      '12': [1026, 44, 38, 32, 35, 36, 47, 35, 43, 30, 38, 32, 33, 38, 36, 27, 36, 30, 31, 32, 38, 29, 25, 27, 24, 36, 37, 26, 47, 23, 27, 14]}
    );




    this.option = {
      baseOption: {
        backgroundColor: '#37606C',
        timeline: {
          // y: 0,
          axisType: 'category',
          // realtime: false,
          // loop: false,
          autoPlay: true,
          // currentIndex: 2,
          playInterval: 1500,
          // controlStyle: {
          //     position: 'left'
          // },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          label: {
            formatter : function(s) {
              return s + '月';
            }
          }
        },
        title: {
          text: '彩铝订单数据分析',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},

        calculable : true,
        grid: {
          top: 80,
          bottom: 100
        },
        xAxis: [
          {
            name : '天',
            'type': 'category',
            'axisLabel': {'interval': 0},
            'data': ['1', '\n2', '3', '\n4', '5', '\n6', '7', '\n8', '9', '\n10', '11', '\n12', '13', '\n14',
              '15', '\n16', '17', '\n18', '19', '\n20', '21', '\n22', '23', '\n24', '25', '\n26', '27', '\n28', '29', '\n30', '31'],
            splitLine: {show: false},
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '订单数',
            // max: 53500
            max : 100,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {name: 'days', type: 'bar'},
          {
            name: '每月订单数占比',
            type: 'pie',
            color: ['#A5DEE4', '#81C7D4', '#24936E', '#5DAC81', '#A8D8B9',
              '#F596AA', '#E87A90', '#F4A7B9', '#DB8E71', '#FB9966', '#E9A368', '#58B2DC'],
            center: ['75%', '20%'],
            radius: [20, '28%'],
            roseType: 'area',
            data: [{name: '1月', value : this.dataMap.dataMonth['1sum']},
              {name: '2月', value : this.dataMap.dataMonth['2sum']},
              {name: '3月', value : this.dataMap.dataMonth['3sum']},
              {name: '4月', value : this.dataMap.dataMonth['4sum']},
              {name: '5月', value : this.dataMap.dataMonth['5sum']},
              {name: '6月', value : this.dataMap.dataMonth['6sum']},
              {name: '7月', value : this.dataMap.dataMonth['7sum']},
              {name: '8月', value : this.dataMap.dataMonth['8sum']},
              {name: '9月', value : this.dataMap.dataMonth['9sum']},
              {name: '10月', value : this.dataMap.dataMonth['10sum']},
              {name: '11月', value : this.dataMap.dataMonth['11sum']},
              {name: '12月', value : this.dataMap.dataMonth['12sum']},
            ]
          }

        ]
      },
      options: [
        {


          title: {subtext: '1月订单数分布-Acring'},
          series: [
            {data: this.dataMap.dataMonth['1'], itemStyle: {
                normal: {
                  color: '#A5DEE4'
                }
              }, },

          ]
        },
        {

          title : {subtext: '2月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['2'], itemStyle: {
              normal: {
                color: '#81C7D4'
              }
            }, }, ]
        },
        {
          title : {subtext: '3月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['3'], itemStyle: {
              normal: {
                color: '#24936E'
              }
            }, }, ]
        },
        {
          title : {subtext: '4月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['4'], itemStyle: {
              normal: {
                color: '#5DAC81'
              }
            }, }, ]
        },
        {
          title : {subtext: '5月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['5'], itemStyle: {
              normal: {
                color: '#A8D8B9'
              }
            }, }, ]
        },
        {
          title : {subtext: '6月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['6'], itemStyle: {
              normal: {
                color: '#F596AA'
              }
            }, }, ]
        },
        {
          title : {subtext: '7月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['7'], itemStyle: {
              normal: {
                color: '#E87A90'
              }
            }, }, ]
        },
        {
          title : {subtext: '8月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['8'], itemStyle: {
              normal: {
                color: '#F4A7B9'
              }
            }, }, ]
        },
        {
          title : {subtext: '9月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['9'], itemStyle: {
              normal: {
                color: '#DB8E71'
              }
            }, }, ]
        },
        {
          title : {subtext: '10月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['10'], itemStyle: {
              normal: {
                color: '#FB9966'
              }
            }, }, ]
        },
        {
          title : {subtext: '11月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['11'], itemStyle: {
              normal: {
                color: '#E9A368'
              }
            }, }, ]
        },
        {
          title : {subtext: '12月订单数分布-Acring'},
          series : [{data: this.dataMap.dataMonth['12'], itemStyle: {
              normal: {
                color: '#58B2DC'
              }
            }, }, ]
        },

      ]
    };
  }

}
