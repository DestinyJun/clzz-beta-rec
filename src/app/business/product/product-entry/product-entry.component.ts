import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

  orders: Order[] = [];
  constructor(private http: HttpClient) {
    this.http.post('http://120.78.137.182/element-plc/finished/find-produce-information', '')
      .subscribe(data => {
        this.orders = data['values'];
        console.log(data);
      });
  }
  ngOnInit() {
  }
}
export class Order {

  constructor(
    public  oid: string,
    public  numofware: string,
    public  idt: string,
    public  status: string,
  ) {}
}

