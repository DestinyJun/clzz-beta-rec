import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InfoStatusService} from '../../../remind/info-status.service';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css']
})
export class MaterialMessageComponent implements OnInit {


  hid = false;
  aluminums = [];
  paints = [];
  private row = 10;
  constructor(private http: HttpClient, private MaterialStatus: InfoStatusService) {
    console.log(this.MaterialStatus);
    if (!this.MaterialStatus.get('mode')) {
      this.MaterialStatus.setNumber('Al-page', 1);
      this.MaterialStatus.setNumber('Paint-page', 1);
      this.MaterialStatus.set('mode', '0');
    }
    this.SeeOrders();
  }

  ngOnInit() {
    this.SeeOrders();
  }

  ToggleAl() {
    this.MaterialStatus.set('mode', '0');
    this.SeeOrders();
  }
  TogglePaint() {
    this.MaterialStatus.set('mode', '1');
    this.SeeOrders();
  }
  public Status(i): string {
    if (i === 0) {
      return '未提交';
    } else if (i === 1) {
      return '已提交未审核';
    } else if (i === 2) {
      return '审核通过';
    } else if (i === 3) {
      return '已出库';
    } else if (i === 4) {
      return '审核未通过';
    }
    return '无法识别';
  }
  public Used(i): string {
    if (i === 0) {
      return '未使用';
    } else if (i === 1) {
      return '已使用';
    }
  }
  SeeOrders() {
    console.log(this.MaterialStatus.get('mode'));
    let body;
    if (this.MaterialStatus.get('mode') === '0') {
      body = {
        'page': this.MaterialStatus.get('Al-page'),
        'row': this.row,
        'mode': this.MaterialStatus.getNumber('mode')
      };
      console.log(body);
      this.http.post('http://120.78.137.182/element/findrawpage', JSON.stringify(body))
        .subscribe(data => {
          console.log(data);
          this.aluminums = data['values1'];
          console.log(this.aluminums);
          this.MaterialStatus.set('Al-number', data['number']);
        });
    } else {
      body = {
        'page': this.MaterialStatus.get('Paint-page'),
        'row': this.row,
        'mode': this.MaterialStatus.getNumber('mode')
      };
      console.log(body);
      this.http.post('http://120.78.137.182/element/findrawpage', JSON.stringify(body))
        .subscribe(data => {
          console.log(data);
          this.paints = data['values2'];
          this.MaterialStatus.set('Paint-number', data['number']);
        });
    }

  }
  NextPage() {
    let number, page;
    if (this.MaterialStatus.get('mode') === '0') {
      page = this.MaterialStatus.getNumber('Al-page');
      number = this.MaterialStatus.getNumber('Al-number');
      if (number >= page * this.row) {
        this.MaterialStatus.setNumber('page', page + 1);
        this.SeeOrders();
      }
    } else {
      page = this.MaterialStatus.getNumber('Paint-page');
      number = this.MaterialStatus.getNumber('Paint-number');
      if (number >= page * this.row) {
        this.MaterialStatus.setNumber('page', page + 1);
        this.SeeOrders();
      }
    }

  }

  FrontPage() {
    let number, page;
    if (this.MaterialStatus.get('mode') === '0') {
      page = this.MaterialStatus.getNumber('Al-page');
      number = this.MaterialStatus.getNumber('Al-number');
      if (this.MaterialStatus.getNumber('Al-page') > 1) {
        this.MaterialStatus.setNumber('page', page - 1);
        this.SeeOrders();
      }
    } else {
      page = this.MaterialStatus.getNumber('Paint-page');
      number = this.MaterialStatus.getNumber('Paint-number');
      if (this.MaterialStatus.getNumber('Paint-page') > 1) {
        this.MaterialStatus.setNumber('page', page - 1);
        this.SeeOrders();
      }
    }

  }

}
