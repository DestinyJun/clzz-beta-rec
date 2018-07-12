import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MainHttpService} from '../../../remind/business/main-http.service';
import {BigToSmall} from '../../../remind/ts/componentAnimation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [BigToSmall]
})
export class ListComponent implements OnInit {


  public orderlist: Observable<any>;
  public orders: Array<object>;
  public order: FormGroup;
  public buttonDisabled = [true, true, true, true, true, true, true, true];
  constructor(private http: MainHttpService, private fb: FormBuilder) {
    this.order = this.fb.group({
      address: [{value: '', disabled: true}],
      allength: [{value: '', disabled: true}],
      althickness: [{value: '', disabled: true}],
      altype: [{value: '', disabled: true}],
      amount: [{value: '', disabled: true}],
      alwidth: [{value: '', disabled: true}],
      audit: [{value: '', disabled: true}],
      auditor: [{value: '', disabled: true}],
      audittime: [{value: '', disabled: true}],
      bccd: [{value: '', disabled: true}],
      bchickness: [{value: '', disabled: true}],
      bchicknessw: [{value: '', disabled: true}],
      bdry_film: [{value: '', disabled: true}],
      bprogram: [{value: '', disabled: true}],
      btype: [{value: '', disabled: true}],
      bwet_film: [{value: '', disabled: true}],
      cname: [{value: '', disabled: true}],
      contractname: [{value: '', disabled: true}],
      deviation: [{value: '', disabled: true}],
      doublecloat: [{value: '', disabled: true}],
      exdelitime: [{value: '', disabled: true}],
      exshiptime: [{value: '', disabled: true}],
      fccd: [{value: '', disabled: true}],
      fdry_film: [{value: '', disabled: true}],
      figure: [{value: '', disabled: true}],
      fprogram: [{value: '', disabled: true}],
      fthickness: [{value: '', disabled: true}],
      fthicknessw: [{value: '', disabled: true}],
      ftype: [{value: '', disabled: true}],
      fwet_film: [{value: '', disabled: true}],
      oid: [{value: '', disabled: true}],
      ostatus: [{value: '', disabled: true}],
      pccd: [{value: '', disabled: true}],
      pdry_film: [{value: '', disabled: true}],
      pprogram: [{value: '', disabled: true}],
      price: [{value: '', disabled: true}],
      pthickness: [{value: '', disabled: true}],
      pthicknessw: [{value: '', disabled: true}],
      ptype: [{value: '', disabled: true}],
      pwet_film: [{value: '', disabled: true}],
      submitter: [{value: '', disabled: true}],
      subtime: [{value: '', disabled: true}],
      tel: [{value: '', disabled: true}]
    });
    const body = {
      page: 1,
      row: 5,
      status: 0
    };
    this.orderlist = this.http
      .SeeOrders(body);
      this.orderlist.subscribe(data => {
        console.log(data);
        this.orders = data['values']['datas'];
      });
  }

  ngOnInit() {
  }
  modal(value): void {
    let i;
    for (i = 0; i < value.ostatus - 1; i++) {
      this.buttonDisabled[i] = false;
    }
    for (; i < 8; i++) {
      this.buttonDisabled[i] = true;
    }
    this.order.patchValue(value);
  }

}

