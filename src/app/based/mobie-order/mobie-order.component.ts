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
  order = new Order();
  operationsHistoryDTOS = [];
  rawAluminum = new RawAluminum();
  rawPaint = new RawPaint();
  rawDiluent = new RawDiluent();
  orderProp = [
    'contractName', 'alType', 'aluminumLength', 'alWidth', 'alThickness', 'backType',
    'primerType', 'finishType', 'backColor', 'primerColor', 'finishColor', 'backProgram',
    'primerProgram', 'finishProgram', 'doubleCloat', 'figura', 'exDeliveryTime', 'exShipTime',
    'tel', 'productionTime'
  ];
  orderName = [
    '项目名', '合金状态', '单卷长度(米)', '铝卷宽度(毫米)', '铝卷厚度(微米)', '背漆类型',
    '底漆类型', '面漆类型', '背漆颜色', '底漆颜色', '面漆颜色', '背漆上机粘度',
    '底漆上机粘度', '面漆上机粘度', '是否双面', '花纹有无', '预计交货时间', '预计发货时间',
    '联系电话', '出产时间'
  ];
  rawAProp = ['alId', 'purchase', 'supplier', 'alWeight', 'alType', 'idt', 'upt'];
  rawAName = ['铝卷编号', '原料批号', '厂家名称', '单卷重量', '合金状态', '入库时间', '出库时间'];
  rawPProp = ['purchase', 'paintPurpose', 'paintColor', 'paintType', 'supplier', 'idt', 'udt'];
  rawPName = ['原料批号', '油漆用途', '油漆颜色', '油漆类型', '生产厂家', '入库时间', '出库时间'];
  rawDProp = ['purchase', 'supplier', 'diluentType', 'diluentPurpose', 'idt', 'upt'];
  rawDName = ['采购批号', '生产厂家', '稀释剂类型', '稀释剂用途', '入库时间', '出库时间'];
  city: string;
  targetlist: string;
  oid: string;
  aluminumcode: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: ActivatedRoute, private user: LoginIdService) {
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
      console.log(data);
      this.order = data['values']['finishProduceDataDTOS'];
      for (let i = 0; i < data['values']['homePageThicknessDTOS'].length; i++) {
        this.bt[i] = data['values']['homePageThicknessDTOS'][i]['bottomThickness'];
        this.ft[i] = data['values']['homePageThicknessDTOS'][i]['finishThickness'];
        this.pt[i] = data['values']['homePageThicknessDTOS'][i]['plateThickness'];
        this.dateTime[i] = data['values']['homePageThicknessDTOS'][i]['datetime'];
      }
      this.operationsHistoryDTOS = data['values']['operationsHistoryDTOS'];
      this.operationsHistoryDTOS['doubleCloat'] = this.operationsHistoryDTOS['doubleCloat'] === 1 ? '是' : '否';
      this.operationsHistoryDTOS['figura'] = this.operationsHistoryDTOS['figura'] === 1 ? '有' : '无';
      this.rawPaint = data['values']['rawPaint'];
      this.rawDiluent = data['values']['rawDiluent'];
      this.rawAluminum = data['values']['rawAluminum'];
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
      series: [
        {
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
          areaStyle: {normal: {color: '#082d37'}},
          data: this.bt
        },
        {
          name: '面漆厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: this.ft
        },
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
class Order {
  contractName: string;
  alType: string;
  alWidth: string;
  alThickness: string;
  backType: string;
  primerType: string;
  finishType: string;
  backColor: string;
  primerColor: string;
  finishColor: string;
  backProgram: string;
  primerProgram: string;
  finishProgram: string;
  doubleCloat: number;
  figura: number;
  exDeliveryTime: string;
  exShipTime: string;
  tel: string;
  aluminumLength: string;
  proBatchNumber: string;
  productionTime: string;
}
class RawAluminum {
  alId: string;
  purchase: string;
  supplier: string;
  alWeight: string;
  alType: string;
  idt: string;
  upt: string;
}
class RawPaint {
  purchase: string;
  paintPurpose: string;
  paintColor: string;
  paintType: string;
  supplier: string;
  idt: string;
  udt: string;
}
class RawDiluent {
  purchase: string;
  supplier: string;
  diluentType: string;
  diluentPurpose: string;
  idt: string;
  upt: string;
}
