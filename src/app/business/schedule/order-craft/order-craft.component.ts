import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../remind/login-id.service';

@Component({
  selector: 'app-order-craft',
  templateUrl: './order-craft.component.html',
  styleUrls: ['./order-craft.component.css']
})
export class OrderCraftComponent implements OnInit {

  page = 1;
  row = 10;
  orders = [];
  order = new Order();
  AllOrders: number;
  read = true;
  film: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private user: LoginIdService
  ) {
    this.SeeOrders();
    this.film = this.fb.group({
      fdry_film: ['', Validators.required],
      fwet_film: ['', Validators.required],
      bdry_film: ['', Validators.required],
      bwet_film: ['', Validators.required],
      pdry_film: ['', Validators.required],
      pwet_film: ['', Validators.required],
      pro_system: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.SeeOrders();
  }

  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"' + this.row + '",\n' +
      '\t"status":"2"\n' +
      '}';
    this.http.post('http://120.78.137.182/element/See-Orders', body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
        this.AllOrders = data['number'];
      });
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
  SkipPage(value) {
    if (this.AllOrders > value  * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    } else if (this.AllOrders > (value - 1) * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    }
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
  ModalValue(value) {
    this.order = value;
    console.log(value);
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
  pass(oid) {
    const body = '  {\n' +
      '"oid":"' + oid + '",\n' +
      '"pro_auditor":"' + this.user.get('userName') + '",\n' +
      '"fdry_film":"' + this.film.get('fdry_film').value + '",\n' +
      '"fwet_film":"' + this.film.get('fwet_film').value + '",\n' +
      '"pdry_film":"' + this.film.get('pdry_film').value + '",\n' +
      '"pwet_film":"' + this.film.get('pwet_film').value + '",\n' +
      '"bdry_film":"' + this.film.get('bdry_film').value + '",\n' +
      '"bwet_film":"' + this.film.get('bwet_film').value + '",\n' +
      '"status":"3",\n' +
      '"pro_system":"' + this.film.get('pro_system').value + '"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Update-Orders', body)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
  }
  Nopass(oid) {
    const body = '  {\n' +
      '"oid":"' + oid + '",\n' +
      '"pro_auditor":"' + this.user.get('userName') + '",\n' +
      '"fdry_film":"' + this.film.get('fdry_film').value + '",\n' +
      '"fwet_film":"' + this.film.get('fwet_film').value + '",\n' +
      '"pdry_film":"' + this.film.get('pdry_film').value + '",\n' +
      '"pwet_film":"' + this.film.get('pwet_film').value + '",\n' +
      '"bdry_film":"' + this.film.get('bdry_film').value + '",\n' +
      '"bwet_film":"' + this.film.get('bwet_film').value + '",\n' +
      '"status":"11",\n' +
      '"pro_system":"' + this.film.get('pro_system').value + '"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Update-Orders', body)
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
  audit: string;
  auditor: string;
  audittime: string;
  bccd: string;
  bchickness: string;
  bchicknessw: string;
  bdry_film: string;
  bprogram: string;
  btype: string;
  bwet_film: string;
  cname: string;
  contractname: string;
  deviation: string;
  doublecloat: string;
  exdelitime: string;
  exshiptime: string;
  fccd: string;
  fdry_film: string;
  figure: string;
  fprogram: string;
  fthickness: string;
  fthicknessw: string;
  ftype: string;
  fwet_film: string;
  oid: string;
  ostatus: string;
  pccd: string;
  pdry_film: string;
  pprogram: string;
  price: string;
  pthickness: string;
  pthicknessw: string;
  ptype: string;
  pwet_film: string;
  submitter: string;
  subtime: string;
  tel: string;
}
