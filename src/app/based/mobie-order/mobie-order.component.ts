import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Url} from '../../getUrl';
import {LoginIdService} from '../../login/login-id.service';
declare let BMap;

@Component({
  selector: 'app-mobie-order',
  templateUrl: './mobie-order.component.html',
  styleUrls: ['./mobie-order.component.css']
})
export class MobieOrderComponent implements OnInit {
  options: any;
  bt = [];
  ft = [];
  pt = [];
  dateTime = [];
  url = new Url().getUrl();
  order: any;
  city: string;
  targetlist: string;
  oid: string;
  aluminumcode: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: ActivatedRoute, private user: LoginIdService) {
    console.log(this.user);
    console.log(this.order);
    this.city = this.route.snapshot.params['city'];
    if (this.city !== 'false') {
      this.ionViewWillEnter(this.city);
    }
    this.targetlist = this.route.snapshot.params['targetlist'];
    this.aluminumcode = this.route.snapshot.params['aluminumcode'];
    this.oid = this.route.snapshot.params['oid'];
    this.findThinknessData({
      orderId: this.oid,
      aluminumCode: this.aluminumcode,
      targetList: this.targetlist
    }).subscribe(data => {
      for (let i = 0; i < data['values']['homePageThicknessDTOS'].length; i++) {
        this.bt[i] = data['values']['homePageThicknessDTOS'][i]['bottomThickness'];
        this.ft[i] = data['values']['homePageThicknessDTOS'][i]['finishThickness'];
        this.pt[i] = data['values']['homePageThicknessDTOS'][i]['plateThickness'];
        this.dateTime[i] = data['values']['homePageThicknessDTOS'][i]['datetime'];
        // this.order = data['finishProduceDataDTOS'];
      }
      this.initOption();
    });
  }
  public ionViewWillEnter(city: string): object {
    const myCity = new BMap.LocalCity();
    myCity.get(address => {
      this.city = address;
    });
    const geolocation = new BMap.Geolocation();
    const that = this;
    const ta = this.targetlist, ad = this.city, ht = this.http, ps = this.parameterSerialization, he = this.headers;
    let sg, st, eg, et, ss, body;
    geolocation.getCurrentPosition(function (r) {
      const geoc = new BMap.Geocoder();
      geoc.getLocation(r.point, function (rs) {
        sg = rs.point.lng;
        st = rs.point.lat;
        ss = rs.address;
        geoc.getPoint(city, function (point) {
          eg = point.lng;
          et = point.lat;
          body = {
            target_id: ta,
            destination: ad,
            scavengingaddress: ss,
            dlongitude: eg,
            dlatitude: et,
            slongitude: sg,
            slatitude: st
          };
          ht.post('http://' + that.url + '/element-plc/scavenging-event', ps(body), {
            headers: he
          }). subscribe(data => console.log(data) );
        });
      });
    }, {enableHighAccuracy: true});

    return body;
  }
  ngOnInit() {
    this.FindOrdersId({oid: this.oid}).subscribe(data => {
      console.log(data);
      this.order = data['values'][0];
    });
  }
  initOption() {
    this.options = {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#269b97'
          }}},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5px',
        containLabel: true
      },
      xAxis : [{
        type: 'category',
        height: '80%',
        boundaryGap: false,
        data: this.dateTime,
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
      }],
      yAxis: [{
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
      }],
      series: [{
        name: '铝板厚度',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: this.pt
      },
        {
          name: '底漆厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {color: '#269b97'}},
          data: this.bt
        },
        {
          name: '面漆厚度',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: this.ft
        }
      ]
    };
  }
  public FindOrdersId(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://' + this.url + '/element/FindOrdersId', body, {
      headers: this.headers
    });
  }
  public findThinknessData(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://' + this.url + '/element-plc/findThinknessData', body, {
      headers: this.headers
    });
  }
  private parameterSerialization(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }
}
