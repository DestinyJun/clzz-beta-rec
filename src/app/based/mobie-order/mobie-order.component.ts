import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
declare let BMap;

@Component({
  selector: 'app-mobie-order',
  templateUrl: './mobie-order.component.html',
  styleUrls: ['./mobie-order.component.css']
})
export class MobieOrderComponent implements OnInit {

  public order: Order;
  public address: string;
  targetlist: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.FindOrdersId({oid: this.route.snapshot.params['targetlist']})
      .subscribe(data => {
        console.log(data);
        this.order = data['values'][0];
      });
    this.address = this.route.snapshot.params['address'];
    if (this.address !== 'false') {
      this.targetlist = this.route.snapshot.params['targetlist'];
      this.ionViewWillEnter(this.address);
    }

  }


  public ionViewWillEnter(city: string): object {
    const geolocation = new BMap.Geolocation();
    const ta = this.targetlist, ad = this.address, ht = this.http, ps = this.parameterSerialization, he = this.headers;
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
          ht.post('http://120.78.137.182/element-plc/scavenging-event', ps(body), {
            headers: he
          }). subscribe(data => console.log(data) );
        });
      });
    }, {enableHighAccuracy: true});

    return body;
  }
  ngOnInit() {
  }

  public FindOrdersId(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://120.78.137.182/element/FindOrdersId', body, {
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
export class Order {
  constructor(
    public altype: string,
    public allength: string,
    public alwidth: string,
    public althickness: string,
    public ftype: string,
    public fthickness: string,
    public fccd: string,
    public fprogram: string) {}
}
