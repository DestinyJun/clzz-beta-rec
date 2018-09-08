import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainHttpService} from '../main-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {orderFormName, orderFormProp, orderTableName, orderTableProp} from './listOrder';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  orders: Array<object>;
  order: FormGroup;
  orderFormName = orderFormName;
  orderFormProp = orderFormProp;
  orderTableName = orderTableName;
  orderTableProp = orderTableProp;
  buttonDisabled = [true, true, true, true, true, true, true, true];
  constructor(private http: MainHttpService, private fb: FormBuilder, private user: LoginIdService) {
    this.order = this.fb.group({
      contractname: ['', Validators.required],
      cname: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      altype: ['', Validators.required],
      area: ['', Validators.required],
      alwidth: ['', Validators.required],
      althickness: ['', Validators.required],
      btype: ['', Validators.required],
      bccd: ['', Validators.required],
      bprogram: ['', Validators.required],
      ptype: ['', Validators.required],
      pccd: ['', Validators.required],
      pprogram: ['', Validators.required],
      ftype: ['', Validators.required],
      fccd: ['', Validators.required],
      fprogram: ['', Validators.required],
      doublecloat: [''],
      country: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      deviation: ['', Validators.required],
      figura: [''],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      exdelitime: ['', Validators.required],
      exshiptime: ['', Validators.required],
      pro_system: [''],
    });
    const body = {
      page: 1,
      row: 5,
      status: 0,
      sysids: this.user.getObject('user').sysids
    };
    this.http.SeeOrders(body).subscribe(data => {
        console.log(data);
        this.orders = data['values']['datas'];
      });
  }

  ngOnInit() {
  }
  chineseStatus(status: number): string {
    switch (status) {
      case 1:
        return '待销售经理审核';
      case 2:
        return '待生产经理审核';
      case 3:
        return '已完成审核';
      case 4:
        return '准备生产';
      case 5:
        return '正在生产';
      case 6:
        return '待入库';
      case 7:
        return '已入库';
      case 8:
        return '已出库';
    }
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

