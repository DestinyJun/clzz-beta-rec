import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ScheduleHttpService} from '../../../remind/business/schedule-http.service';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css']
})
export class OrderQueryComponent implements OnInit {

  public page = 1;
  public orders = [];
  public row = 10;
  public orderForm: FormGroup;
  public AllOrders: number;
  public read = true;

  constructor(private http: ScheduleHttpService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      oid: ['', Validators.required],
      cname: ['', Validators.required],
      contractname: ['', Validators.required],
      tel: ['', Validators.required],
      altype: ['', Validators.required],
      allength: ['', Validators.required],
      alwidth: ['', Validators.required],
      althickness: ['', Validators.required],
      fthickness: ['', Validators.required],
      ftype: ['', Validators.required],
      fprogram: ['', Validators.required],
      fccd: ['', Validators.required],
      pthickness: ['', Validators.required],
      ptype: ['', Validators.required],
      pprogram: ['', Validators.required],
      pccd: ['', Validators.required],
      doublecloat: ['', Validators.required],
      figure: ['', Validators.required],
      bchickness: ['', Validators.required],
      btype: ['', Validators.required],
      bprogram: ['', Validators.required],
      bccd: ['', Validators.required],
      address: ['', Validators.required],
      submitter: ['', Validators.required],
      exdelitime: ['', Validators.required],
      exshiptime: ['', Validators.required],
      ostatus: ['', Validators.required],
      country: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.SeeOrders();
  }
  SeeOrders() {
    const body = {
     page: this.page,
      row: this.row,
     status: 0
      };
    this.http.SeeOrders(body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
        this.AllOrders = data['number'];
      });
  }
  NextPage() {
    if (this.AllOrders > this.page * 10) {
      this.page++;
      this.SeeOrders();
    }
  }

  ProPage() {
    if (this.page > 1) {
      this.page--;
      this.SeeOrders();
    }
  }
  SkipPage(value) {
    if (this.AllOrders > value  * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    } else if (this.AllOrders > (value - 1) * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    }
  }
  DeleteOrder(oid) {
    if (window.confirm('确认删除吗？') ) {
      const body = {delete_id: oid};
      this.http.DelOrders(body)
        .subscribe(data => {
          this.SeeOrders();
        });
    }
  }
  PageNumber() {
    const i = this.AllOrders % this.row;
    if (i === 0 && this.AllOrders > this.row) {
      return this.AllOrders / this.row;
    } else if ( i === 0) {
      return this.AllOrders / this. row;
    } else {
      return (this.AllOrders - i ) / this.row + 1;
    }
  }
  modal(value) {
    console.log(value);
    this.orderForm.patchValue(value);
    console.log(this.orderForm);
  }
  remodal(): void {
    this.read = false;
  }

  status(value): string {
    if (value === 0) {
      return '未提交';
    } else if (value === 1) {
      return '已提交';
    } else if (value === 2) {
      return '销售经理已审核';
    } else if (value === 3) {
      return '生产经理已审核';
     } else if (value === 4) {
      return '正在生产';
    } else if (value === 5) {
      return '成品已入库';
    } else if (value === 6) {
      return '成品已出库';
    }
  }
  Modify() {
    const body = {
      oid: this.orderForm.get('oid').value ,
      cname: this.orderForm.get('cname').value,
      contractname: this.orderForm.get('contractname').value,
      tel: this.orderForm.get('tel').value,
      Altype: this.orderForm.get('altype').value,
      Allength: this.orderForm.get('allength').value,
      Alwidth: this.orderForm.get('alwidth').value,
      Althickness: this.orderForm.get('althickness').value,
      fthickness: this.orderForm.get('fthickness').value,
      ftype: this.orderForm.get('ftype').value,
      fprogram: this.orderForm.get('fprogram').value,
      fccd: this.orderForm.get('fccd').value,
      pthickness: this.orderForm.get('pthickness').value,
      ptype: this.orderForm.get('ptype').value,
      pprogram: this.orderForm.get('pprogram').value,
      pccd: this.orderForm.get('pccd').value,
      doublecloat: this.orderForm.get('doublecloat'),
      figura: this.orderForm.get('figure').value,
      bchickness: this.orderForm.get('bchickness').value,
      btype: this.orderForm.get('btype').value,
      bprogram: this.orderForm.get('bprogram').value,
      bccd: this.orderForm.get('bccd').value,
      address: this.orderForm.get('address').value,
      submitter: this.orderForm.get('submitter').value,
      exdelitime: this.orderForm.get('exdelitime').value,
      exshiptime: this.orderForm.get('exshiptime').value,
      status: this.orderForm.get('ostatus').value,
      country: this.orderForm.get('country').value,
      province: this.orderForm.get('province').value,
      city: this.orderForm.get('city').value
      };
    console.log(body);
    this.http.UpdateOrders(body)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
  }
}

export class Order {
  address: string;
  allength: string;
  althickness: string;
  altype: string;
  amount: string;
  alwidth: string;
  bccd: string;
  bchickness: string;
  bchicknessw: string;
  bprogram: string;
  btype: string;
  cname: string;
  contractname: string;
  doublecloat: string;
  exdelitime: string;
  exshiptime: string;
  fccd: string;
  figure: string;
  fprogram: string;
  fthickness: string;
  fthicknessw: string;
  ftype: string;
  oid: string;
  ostatus: string;
  pccd: string;
  price: string;
  pthickness: string;
  ptype: string;
  submitter: string;
  subtime: string;
  tel: string;
  country: string;
  province: string;
  city: string;
}
