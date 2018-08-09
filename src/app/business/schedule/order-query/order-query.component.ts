import {Component, HostBinding, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ScheduleHttpService} from '../schedule-http.service';
import {slideToRight} from '../../../routeAnimation';
import {LoginIdService} from '../../../login/login-id.service';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css'],
  animations: [slideToRight]
})
export class OrderQueryComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  public orderForm: FormGroup;
  public read = true;
  public Color = [];
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['修改'];
  constructor(private http: ScheduleHttpService, private fb: FormBuilder,
              public page: PageService, private activatedRoute: ActivatedRoute) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordque');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
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
      figura: ['', Validators.required],
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
  }
  Select(i) {
    for (let j = 0; j < this.Color.length; j++) {
      if (i !== j) {
        this.Color[j] = false;
      }
    }
    this.Color[i] = true;
  }

  SeeOrders() {
    this.http.SeeOrders(this.page.getNowPage(), this.page.getRow(), 0)
      .subscribe(data => {
        console.log(data);
        this.tBody = data['values']['datas'];
        this.page.setPage(data['values']['number']);
      });
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
  modalValue(value) {
    console.log(this.tBody[value]);
    this.tBody[value]['doublecloat'] = value['doublecloat'] === 1 ? '是' : '否';
    this.tBody[value]['figura'] = value['figura'] === 1 ? '是' : '否';
    console.log(value);
    this.orderForm.patchValue(this.tBody[value]);
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
      doublecloat: this.orderForm.get('doublecloat').value  === '是' ? '1' : '0',
      figura: this.orderForm.get('figura').value === '是' ? '1' : '0',
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
      city: this.orderForm.get('city').value,
      };
    console.log(body);
    this.http.UpdateOrders(body)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          window.confirm('修改成功');
        } else {
          window.confirm(data['message']);
        }
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
