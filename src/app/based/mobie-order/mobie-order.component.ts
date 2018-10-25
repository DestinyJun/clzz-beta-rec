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

  url = new Url().getUrl();
  order: any;
  city: string;
  targetlist: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: ActivatedRoute, private user: LoginIdService) {
    console.log(this.user);
    console.log(this.order);
    this.city = this.route.snapshot.params['city'];
    if (this.city !== 'false') {
      this.targetlist = this.route.snapshot.params['targetlist'];
      this.ionViewWillEnter(this.city);
    }

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
    this.FindOrdersId({oid: this.targetlist}).subscribe(data => {
      console.log(data);
      this.order = data['values'][0];
    });
  }

  public FindOrdersId(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://' + this.url + '/element/FindOrdersId', body, {
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
