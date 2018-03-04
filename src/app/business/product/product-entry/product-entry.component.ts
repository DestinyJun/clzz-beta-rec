import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {

  orders: Order[] = [
    new Order(1, '彩铝产业合同', 'PW1101AG101PW', '小明', 1023, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(2, '彩铝产业合同', 'PW1101AG101PW', '小王', 1024, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(3, '彩铝产业合同', 'PW1101AG101PW', '小刚', 1025, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(4, '彩铝产业合同', 'PW1101AG101PW', '小梅', 1026, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(5, '彩铝产业合同', 'PW1101AG101PW', '小红', 1027, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(6, '彩铝产业合同', 'PW1101AG101PW', '小强', 1028, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(7, '彩铝产业合同', 'PW1101AG101PW', '小静', 1029, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(8, '彩铝产业合同', 'PW1101AG101PW', '小华', 1030, '2017.12.30', '小李', '2018.1.14', '小王'),
    new Order(9, '彩铝产业合同', 'PW1101AG101PW', '小芳', 1031, '2017.12.30', '小李', '2018.1.14', '小王')
  ];
  constructor() {
  }
  ngOnInit() {
  }
}
export class Order {

  constructor(
    public  id: number,
    public  contracttitle: string,
    public  Serialnumber: string,
    public  customertitle: string,
    public  Productnumber: number,
    public  Storagetime: string,
    public  Warehousing_agent: string,
    public  deliverytime: string,
    public  Warehousingagent: string,
  ) {}
}

