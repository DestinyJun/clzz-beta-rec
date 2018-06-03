import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-tactics-map',
  templateUrl: './tactics-map.component.html',
  styleUrls: ['./tactics-map.component.css'],
  animations: [slideToRight]
})
export class TacticsMapComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  data: any;
  geoCoordMap: any;
  option: any;
  categoryData = [];
  selectedItems = [];
  barData = [];
  sum = 0;
  count = 0;
  constructor() {
    this.data = [
      { name: 'shanghai', value: 29780},
      { name: 'zhuhai', value: 2186},
    ];
    this.geoCoordMap = [
      [121.48, 31.22],
      [113.52, 22.3]
    ];
  }

  ngOnInit() {
    const convertData = function(data) {
      const res = [];
      for (let i = 0; i < data.length; i++) {
        console.log(this.geoCoordMap[i]);
        const geoCoord = this.geoCoordMap[i];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };

    const convertedData = [
      convertData(this.data),
      convertData(this.data.sort(function(a, b) {
        return b.value - a.value;
      }).slice(0, 6))
    ];
    this.data.sort(function(a, b) {
      return a.value - b.value;
    });


//   var maxBar = 30;
    this.sum = 0;
    this.count = this.data.length;
    for (let i = 0; i < this.data.length; i++) {
      this.categoryData.push(this.data[i].name);
      this.barData.push(this.data[i].value);
      this.sum += this.data[i].value;
    }
    console.log(this.categoryData);
    console.log(this.sum + '   ' + this.count);
    this.option = {
      backgroundColor: '#404a59',
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
      title: [{
        text: '全国36城“无人区”数',
        link: 'http://pages.anjuke.com/expert/newexpert.html',
        subtext: 'data from Anjuke',
        sublink: 'http://pages.anjuke.com/expert/newexpert.html',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      }, {
        id: 'statistic',
        text: this.count ? '平均: ' + Number((this.sum / this.count).toFixed(4)) : '',
        right: 120,
        top: 40,
        width: 100,
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      }],
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: '#fff'
          },
          emphasis: {
            borderColor: '#b1e4ff'
          }
        },
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          },
          saveAsImage: {
            show: true
          }
        }
      },
      brush: {
        outOfBrush: {
          color: '#abc'
        },
        brushStyle: {
          borderWidth: 2,
          color: 'rgba(0,0,0,0.2)',
          borderColor: 'rgba(0,0,0,0.5)',
        },
        seriesIndex: [0, 1],
        throttleType: 'debounce',
        throttleDelay: 300,
        geoIndex: 0
      },
      geo: {
        map: 'china',
        left: '10',
        right: '35%',
        center: [117.98561551896913, 31.205000490896193],
        zoom: 1.5,
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: '30%'
      },
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: '#aaa'
          }
        },
      },
      yAxis: {
        type: 'category',
        //  name: 'TOP 20',
        nameGap: 16,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd'
          }
        },
        data: this.categoryData
      },
      series: [{
        // name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function(val) {
          return Math.max(val[2] / 300, 8);
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#FF8C00',
            position: 'right',
            show: true
          }
        }
      }, {
        //  name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function(val) {
          return Math.max(val[2] / 500, 8);
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 50,
            shadowColor: '#EE0000'
          }
        },
        zlevel: 1
      }, {
        id: 'bar',
        zlevel: 2,
        type: 'bar',
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        },

        data: this.data
      }]
    };



    function renderBrushed(params) {
      const mainSeries = params.batch[0].selected[0];

      this.selectedItems = [];
      this.categoryData = [];
      this.barData = [];
      const maxBar = 30;
      this.sum = 0;
      this.count = 0;

      for (let i = 0; i < mainSeries.dataIndex.length; i++) {
        const rawIndex = mainSeries.dataIndex[i];
        const dataItem = convertedData[0][rawIndex];
        const pmValue = dataItem.value[2];

        this.sum += pmValue;
        this.count++;

        this.selectedItems.push(dataItem);
      }

      this.selectedItems.sort(function(a, b) {
        //   return b.value[2] - a.value[2];
        return a.value - b.value;
      });

      for (let i = 0; i < Math.min(this.selectedItems.length, maxBar); i++) {
        this.categoryData.push(this.selectedItems[i].name);
        this.barData.push(this.selectedItems[i].value[2]);
      }

      this.setOption({
        yAxis: {
          data: this.categoryData
        },
        xAxis: {
          axisLabel: {
            show: !!this.count
          }
        },
        title: {
          id: 'statistic',
          text: this.count ? '平均: ' + (this.sum / this.count).toFixed(4) : ''
        },
        series: {
          id: 'bar',
          //        sort:'descending',
          data: this.barData
        }
      });
    }
  }

}
