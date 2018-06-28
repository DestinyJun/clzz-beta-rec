import {Component, HostBinding, OnInit} from '@angular/core';
import {LoginIdService} from '../../../remind/login-id.service';
import {ScheduleHttpService} from '../../../remind/business/schedule-http.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-order-marketing',
  templateUrl: './order-marketing.component.html',
  styleUrls: ['./order-marketing.component.css'],
  animations: [slideToRight]
})
export class OrderMarketingComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  page = 1;
  orders = [];
  row = 10;
  order = new Order();
  AllOrders: number;

  constructor(private http: ScheduleHttpService, private user: LoginIdService) {
  }

  ngOnInit() {
    this.SeeOrders();
  }
  SeeOrders() {
    const body = {
      page: this.page,
      row: this.row,
      status: 1
      };
    console.log(body);
    this.http.SeeOrders(body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values']['datas'];
        this.AllOrders = data['values']['number'];
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

  pass(oid) {
    oid.auditor = this.user.get('userName');
    oid.status = 2;
    this.http.UpdateOrders(oid)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
  }
  Nopass(oid) {
    oid.auditor = this.user.get('userName');
    oid.status = 11;
    this.http.UpdateOrders(oid)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
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
