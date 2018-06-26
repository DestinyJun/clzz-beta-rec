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
    this.pList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
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
      '1': [1020],
      '2': [928],
      '3': [1024],
      '4': [878],
      '5': [902],
      '6': [914],
      '7': [1070],
      '8': [1342],
      '9': [1157],
      '10': [1185],
      '11': [1116],
      '12': [1026]}
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
            name : '月',
            'type': 'category',
            'axisLabel': {'interval': 0},
            'data': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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
