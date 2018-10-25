import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ScheduleHttpService} from '../schedule-http.service';
import {LoginIdService} from '../../../login/login-id.service';
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
  btnName = '提交';
  doublecloat: string;
  pro_system: string;
  figura: string;
  row = 15;
  pro_systemName = [];
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  position = this.user.getPosition();
  country = this.position;
  provinces = this.country[0]['province'];
  citys =  this.provinces[0]['city'];
  countryName = this.country[0]['name'];
  provinceName = this.provinces[0]['name'];
  cityName = this.citys[0];
  tHead = tHead;
  tBody = tBody;
  prop = prop;
  btnGroup = btnGroup;
  dataName = dataName;
  propType = propType;
  modalProp = modalProp;
  ostatus: string;
  tips: string;
  tipsColor: string;
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private user: LoginIdService,
              public page: PageBetaService, private activatedRoute: ActivatedRoute) {
    console.log(this.position);
    console.log(this.provinces);
    console.log(this.citys);
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
      country: [''],
      province: [''],
      city: [''],
      deviation: ['', Validators.required],
      figura: [''],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      exdelitime: ['', Validators.required],
      exshiptime: ['', Validators.required],
      pro_system: [''],
      oid: ['']
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
          if (data['status'] === '10') {
            this.tips = '订单删除成功!';
            this.tipsColor = '#5cb85c';
          } else {
            this.tips = '订单删除失败!';
            this.tipsColor = '#d9534f';
          }
        });
    }
  }
  addOrder() {
    this.order.reset();
    this.formName = this.order;
    this.btnName = '提交';
  }
  modalValue(index) {
    console.log(this.tBody[index]);
    this.ostatus = this.tBody[index]['ostatus'];
    this.tBody[index]['exdelitime'] = '20' + this.tBody[index]['exdelitime'].split(' ')[0];
    this.tBody[index]['exshiptime'] = '20' + this.tBody[index]['exshiptime'].split(' ')[0];
    this.countryName = this.tBody[index]['country'];
    this.provinceName = this.tBody[index]['province'];
    this.cityName = this.tBody[index]['city'];
    this.doublecloat = this.tBody[index]['doublecloat'] === 1 ? '是' : '否';
    this.figura = this.tBody[index]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[index]['pro_system']);
    this.order2.patchValue(this.tBody[index]);
    this.order2.patchValue({'area': this.tBody[index]['allength'] * this.order2.get('alwidth').value / 100});
    this.order2.patchValue({'amount': this.order2.get('area').value * this.order2.get('price').value});
    this.formName = this.order2;
    this.btnName = '修改完成';
    console.log(this.tBody[index]);
  }
  submitOrder() {
    this.order = this.formName;
    const body = this.order.value;
    body['pro_system'] = this.getProSystemOid();
    body['doublecloat'] = this.doublecloat === '是' ? 1 : 0;
    body['figura'] = this.figura === '有' ? 1 : 0;
    body['allength'] = body['area'] / body['alwidth'] * 100;
    body['submitter'] = this.user.getObject('user').realName;
    body['country'] = this.countryName;
    body['province'] = this.provinceName;
    body['city'] = this.cityName;
    console.log(body);
    this.http.AddOrders(body)
      .subscribe(data => {console.log(data);
        this.SeeOrders();
        if (data['status'] === '10') {
          this.tips = '订单提交成功!';
          this.tipsColor = '#5cb85c';
        } else {
          this.tips = '订单提交失败!';
          this.tipsColor = '#d9534f';
        }
      });
  }
  modifyOrder() {
    this.order2 = this.formName;
    const body = this.order2.value;
    body['pro_system'] = this.getProSystemOid();
    body['doublecloat'] = this.doublecloat === '是' ? 1 : 0;
    body['figura'] = this.figura === '有' ? 1 : 0;
    body['allength'] = body['area'] / body['alwidth'] * 100;
    body['ostatus'] = this.englishStatus(this.ostatus);
    body['submitter'] = this.user.getObject('user').realName;
    body['country'] = this.countryName;
    body['province'] = this.provinceName;
    body['city'] = this.cityName;
    console.log(body);
    this.http.UpdateOrders(body)
      .subscribe(data => {console.log(data);
        this.SeeOrders();
        if (data['status'] === '10') {
          this.tips = '订单修改成功!';
          this.tipsColor = '#5cb85c';
        } else {
          this.tips = '订单修改失败!';
          this.tipsColor = '#d9534f';
        }
      });
  }
  btnBool() {
    return this.formName.invalid || this.figura === undefined
      || this.pro_system === undefined || this.doublecloat === undefined;
  }
  selectCountry() {
    for (let i = 0; i < this.position.length; i++) {
      if (this.countryName === this.position[i]['name']) {
        this.country = this.position[i];
        this.provinces = this.country['province'];
        break;
      }
    }
  }
  selectProvince() {
    for (let i = 0; i < this.provinces.length; i++) {
      if (this.provinceName === this.provinces[i]['name']) {
        this.citys = this.provinces[i]['city'];
        this.cityName = this.citys[0];
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
  englishStatus(status: string) {
    console.log(status);
    if (status === '待销售经理审核') {
      return 1;
    }
    if (status === '待生产经理审核') {
      return 2;
    }
    if (status === '已完成审核') {
      return 3;
    }
    if (status === '准备生产') {
      return 4;
    }
    if (status === '正在生产') {
      return 5;
    }
    if (status === '待入库') {
      return 6;
    }
    if (status === '已入库') {
      return 7;
    }
    if (status === '已出库') {
      return 8;
    }
  }
}
