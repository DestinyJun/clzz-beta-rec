import {Component, OnInit} from '@angular/core';
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
  countryIndex: number;
  provinceIndex: number;
  city: Array<any>;
  countryName: string;
  provinceName: string;
  cityName: string;
  figura: string;
  row = 15;
  pro_systemName = [];
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  position: Array<any> = [];
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
      oid: ['']
    });
  }

  ngOnInit() {
    this.getProSystem();
    this.initPosition();
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
    this.order.reset();
    this.formName = this.order;
    this.btnName = '提交';
  }
  modalValue(index) {
    console.log(this.tBody[index]);
    this.tBody[index]['exdelitime'] = '20' + this.tBody[index]['exdelitime'].split(' ')[0];
    this.tBody[index]['exshiptime'] = '20' + this.tBody[index]['exshiptime'].split(' ')[0];
    this.doublecloat = this.tBody[index]['doublecloat'] === 1 ? '是' : '否';
    this.figura = this.tBody[index]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[index]['pro_system']);
    this.order2.patchValue(this.tBody[index]);
    this.order2.patchValue({'area': this.tBody[index]['allength'] * this.order2.get('alwidth').value});
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
    body['allength'] = body['area'] / body['alwidth'];
    body['submitter'] = this.user.getObject('user').realName;
    console.log(body);
    this.http.AddOrders(body)
      .subscribe(data => {console.log(data);
        this.SeeOrders();
      });
  }
  modifyOrder() {
    this.order2 = this.formName;
    const body = this.order2.value;
    body['pro_system'] = this.getProSystemOid();
    body['doublecloat'] = this.doublecloat === '是' ? 1 : 0;
    body['figura'] = this.figura === '有' ? 1 : 0;
    body['allength'] = body['area'] / body['alwidth'];
    body['submitter'] = this.user.getObject('user').realName;
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
  initPosition() {
    this.http.findCountryProvinceCity().subscribe(data => {
      console.log(data);
      let country: string, province: string, city: string;
      for (let i = 0, ic = 0, ip = 0, _ic = 0; i < data['values'].length; i++) {
        if (ic === 0 || country !== data['values'][i]['country']) {
          this.position[ic] = {name: data['values'][i]['country'],
            province: [{name: data['values'][i]['province'], city: [data['values'][i]['city']]}]};
          ic++;
          ip = 1;
          _ic = 1;
          country = data['values'][i]['country'];
          province = data['values'][i]['province'];
          city = data['values'][i]['city'];
        } else {
          if (province !== data['values'][i]['province']) {
            this.position[ic - 1]['province'][ip] = {name: data['values'][i]['province'], city: [data['values'][i]['city']]};
            ip++;
            _ic = 1;
            province = data['values'][i]['province'];
          } else {
            this.position[ic - 1]['province'][ip - 1]['city'][_ic] = data['values'][i]['city'];
            _ic++;
          }
        }
      }

      console.log(this.position);
    });
  }
  selectCountry(name) {
    if (name !== this.countryName) {
      this.countryName = name;
      for (let i = 0; i < this.position.length; i++) {
        if (this.countryName === this.position[i]['name']) {
          this.countryIndex = i;
          this.provinceIndex = 0;
          break;
        }
      }
    }
  }
  selectProvince(name) {
    if (name !== this.provinceName) {
      this.provinceName = name;
      for (let i = 0; i < this.position[this.countryIndex]['province'].length; i++) {
        if (this.provinceName === this.position[this.countryIndex]['province'][i]['name']) {
          this.city = this.position[this.countryIndex]['province'][i]['city'];
          this.provinceIndex = i;
          break;
        }
      }
    }
  }
}
