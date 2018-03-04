import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public orderlist: Observable<any>;
  public Order: Array<any>;
  constructor(private http: HttpClient) {
    const body = {
      'page': '1',
      'row': '5',
      'status': '0'
    };
    this.orderlist = this.http
      .post('http://120.78.137.182/element/See-Orders', body);
      this.orderlist.subscribe(data => {
        console.log(data);
        this.Order = data['values'];
        console.log(this.Order);
      });
  }

  ngOnInit() {
  }

}
