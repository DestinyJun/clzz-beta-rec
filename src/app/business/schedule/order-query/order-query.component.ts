import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ScheduleHttpService} from '../schedule-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
import {btnGroup, dataName, modalProp, prop, propType, tBody, tHead} from './queryList';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css'],
})
export class OrderQueryComponent implements OnInit {
  order: FormGroup;
  order2: FormGroup;
  formName: FormGroup;
  orderOid: string;
  btnName = '提交';
  doublecloat: string;
  pro_system: string;
  figura: string;
  row = 15;
  pro_systemName = [];
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  tHead = tHead;
  tBody = tBody;
  prop = prop;
  btnGroup = btnGroup;
  dataName = dataName;
  propType = propType;
  modalProp = modalProp;
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private user: LoginIdService,
              public page: PageBetaService, private activatedRoute: ActivatedRoute) {
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/schedule/ordque');
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
    this.formName = this.order2 = this.order = this.fb.group({
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
  }

  ngOnInit() {
    this.getProSystem();
  }

  getProSystem() {
    this.pro_systemName = this.user.getSysids();
  }
  getProSystemOid() {
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (this.pro_system === this.pro_systemName[i]['sysName']) {
        return this.pro_systemName[i]['sysId'];
      }
    }
  }
  getProSystemName(pro_systemSid) {
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (pro_systemSid === this.pro_systemName[i]['sysId']) {
        return this.pro_systemName[i]['sysName'];
      }
    }
  }
  initPageSearch() {
    this.page.setBoolUrl(false);
    this.page.setPageNo(1);
  }
  pageSearch(name) {
    if (this.page.boolUrl === false) {
      this.searchOrder(name);
    }
  }
  searchOrder(name) {
    if (this.page.boolUrl === true) {
      this.initPageSearch();
    }
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        this.http.searchorders(this.page.getPageNo(), this.row, name, this.proSystem[i]['sysId'])
          .subscribe(data => {
            console.log(data);
            this.tBody = data['values']['contents'];
            for (let j = 0; j < this.tBody.length; j++) {
              this.tBody[j]['ostatus'] = this.chineseStatus(Number(this.tBody[j]['ostatus']));
            }
            this.page.setTotalPage(data['values']['totalPage']);
          });
        break;
      }
    }
  }
  chineseStatus(status: number): string {
    switch (status) {
      case 1: return '待销售经理审核';
      case 2: return '待生产经理审核';
      case 3: return '已完成审核';
      case 4: return '准备生产';
      case 5: return '正在生产';
      case 6: return '待入库';
      case 7: return '已入库';
      case 8: return '已出库';
    }
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.SeeOrders();
    }
  }
  SeeOrders() {
    if (this.page.boolUrl === false) {
      this.page.setBoolUrl(true);
    }
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        this.http.SeeOrders(this.page.getPageNo(), this.row, 0, this.proSystem[i]['sysId'])
          .subscribe(data => {
            console.log(data);
            this.tBody = data['values']['contents'];
            for (let j = 0; j < this.tBody.length; j++) {
              this.tBody[j]['ostatus'] = this.chineseStatus(Number(this.tBody[j]['ostatus']));
            }
            this.page.setTotalPage(data['values']['totalPage']);
          });
      }
    }
  }
  deleteOrder(index) {
    if (window.confirm('确认删除吗？') ) {
      const body = {delete_id: this.tBody[index]['oid']};
      this.http.DelOrders(body)
        .subscribe(data => {
          this.SeeOrders();
        });
    }
  }
  addOrder() {
    this.formName = this.order;
    this.btnName = '提交';
  }
  modalValue(value) {
    console.log(this.tBody[value]);
    this.doublecloat = this.tBody[value]['doublecloat'] === 1 ? '是' : '否';
    this.figura = this.tBody[value]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[value]['pro_system']);
    console.log(value);
    this.order2.patchValue(this.tBody[value]);
    this.order2.patchValue({'area': this.tBody[value]['allength'] * this.order2.get('alwidth').value});
    this.formName = this.order2;
    this.orderOid = this.tBody[value]['oid'];
    this.btnName = '修改完成';
    console.log(this.tBody[value]);
  }
  submitOrder() {
    this.order = this.formName;
    this.order.patchValue({'allength': this.order.get('area').value / this.order.get('alwidth').value});
    const body = {
      cname: this.order.get('cname').value,
      contractname: this.order.get('contractname').value,
      tel: this.order.get('tel').value,
      altype: this.order.get('altype').value,
      allength: this.order.get('area').value / this.order.get('alwidth').value,
      alwidth: this.order.get('alwidth').value,
      althickness: this.order.get('althickness').value ,
      ftype: this.order.get('ftype').value,
      fprogram: this.order.get('fprogram').value,
      fccd: this.order.get('fccd').value,
      ptype: this.order.get('ptype').value,
      pprogram: this.order.get('pprogram').value,
      pccd: this.order.get('pccd').value,
      doublecloat: this.doublecloat === '是' ? 1 : 0,
      figura: this.figura === '有' ? 1 : 0,
      btype: this.order.get('btype').value,
      bprogram: this.order.get('bprogram').value,
      bccd: this.order.get('bccd').value,
      address: this.order.get('address').value,
      submitter: this.user.getObject('user').realName,
      exdelitime: this.order.get('exdelitime').value,
      exshiptime: this.order.get('exshiptime').value,
      pro_system: this.getProSystemOid(),
      country: this.order.get('country').value,
      province: this.order.get('province').value,
      city: this.order.get('city').value,
      price: this.order.get('price').value,
      deviation: this.order.get('deviation').value,
      amount: this.order.get('amount').value,
    };
    console.log(body);
    this.http.AddOrders(body)
      .subscribe(data => {console.log(data);
        this.SeeOrders();
      });
  }
  modifyOrder() {
    this.order2 = this.formName;
    this.order2.patchValue({'allength': this.order.get('area').value / this.order.get('alwidth').value});
    const body = {
      cname: this.order2.get('cname').value,
      contractname: this.order2.get('contractname').value,
      tel: this.order2.get('tel').value,
      altype: this.order2.get('altype').value,
      allength: this.order2.get('area').value / this.order.get('alwidth').value,
      alwidth: this.order2.get('alwidth').value,
      althickness: this.order2.get('althickness').value ,
      ftype: this.order2.get('ftype').value,
      fprogram: this.order2.get('fprogram').value,
      fccd: this.order2.get('fccd').value,
      ptype: this.order2.get('ptype').value,
      pprogram: this.order2.get('pprogram').value,
      pccd: this.order2.get('pccd').value,
      doublecloat: this.doublecloat === '是' ? 1 : 0,
      figura: this.figura === '有' ? 1 : 0,
      btype: this.order2.get('btype').value,
      bprogram: this.order2.get('bprogram').value,
      bccd: this.order2.get('bccd').value,
      address: this.order2.get('address').value,
      submitter: this.user.getObject('user').realName,
      exdelitime: this.order2.get('exdelitime').value,
      exshiptime: this.order2.get('exshiptime').value,
      pro_system: this.getProSystemOid(),
      country: this.order2.get('country').value,
      province: this.order2.get('province').value,
      city: this.order2.get('city').value,
      price: this.order2.get('price').value,
      deviation: this.order2.get('deviation').value,
      amount: this.order2.get('amount').value,
      auditor: null,
      oid: this.orderOid
    };
    console.log(body);
    this.http.UpdateOrders(body)
      .subscribe(data => {console.log(data);
        this.SeeOrders();
      });
  }
  btnBool() {
    return this.formName.invalid || this.figura === undefined
      || this.pro_system === undefined || this.doublecloat === undefined;
  }
}
