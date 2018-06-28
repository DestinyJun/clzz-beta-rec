import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public order = new Order();
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
  constructor(private http: HttpClient ) {
    this.http.post('http://120.78.137.182/element-plc/order/audited', '')
      .subscribe(data => {
        const length = data['values'].length;
        for (let i = 0; i < length; i++) {
          if (data['values'][i]['status'] === 1) {
            this.order = data['values'][i];
            break;
          }
        }
      });
  }

  ngOnInit() {
  }

  ReSize(event) {
    this.ModalChart = event;
  }
  ReSizeInit() {
    setTimeout(() => this.ModalChart.resize(), 200);
  }
  }
export class Order {
  altype: string;
  allength: string;
  alwidth: string;
  althickness: string;
  ftype: string;
  fthickness: string;
  cname: string;
  exshiptime: string;
}
