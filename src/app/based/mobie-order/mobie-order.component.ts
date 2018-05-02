import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mobie-order',
  templateUrl: './mobie-order.component.html',
  styleUrls: ['./mobie-order.component.css']
})
export class MobieOrderComponent implements OnInit {

  public order: Order;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.FindOrdersId({oid: this.route.snapshot.params['targetlist']})
      .subscribe(data => {
        console.log(data);
        this.order = data['values'][0];
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
  ngOnInit() {
  }

  public FindOrdersId(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://120.78.137.182/element/FindOrdersId', body, {
      headers: this.headers
    });
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
