import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ScheduleHttpService} from '../schedule-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
import {btnGroup, dataName, modalProp, prop, propType, tBody, tHead} from './queryList';
import {b} from '@angular/core/src/render3';

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
  doublecloat = '是';
  pro_system: string;
  figura = '无';
  altype: string;
  btype: string;
  ptype: string;
  ftype: string;
  bprogram = 60;
  pprogram = 60;
  fprogram = 60;
  altypes = [];
  bpftypes = [];
  row = 15;
  pro_systemName = [];
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  position = this.user.getPosition();
  country = this.position;
  provinces = this.country[0]['province'];
  citys =  this.provinces[0]['city'];
  countryName = this.country[0]['name'];
  provinceName = '贵州省';
  cityName = '贵阳';
  tHead = tHead;
  tBody = tBody;
  prop = prop;
  btnGroup = btnGroup;
  modalProp = modalProp;
  ostatus: string;
  tips: string;
  tipsColor: string;
  exdelitime: string;
  exshiptime: string;
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private user: LoginIdService,
              public page: PageBetaService, private activatedRoute: ActivatedRoute) {
    console.log((new Date()).getDate());
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/true/schedule/ordque');
    this.http.alloyState().subscribe(data => {
      this.altypes = data['values'];
      this.altype = this.altypes[0];
    });
    this.http.normsType().subscribe(data => {
      this.bpftypes = data['values'];
      this.btype = this.ptype = this.ftype = this.bpftypes[0];
    });
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
    this.formName = this.order2 = this.order = this.fb.group({
      cname: ['', Validators.required],
      altype: [''],
      alwidth: ['', Validators.required],
      alweight: ['', Validators.required],
      althickness: ['', Validators.required],
      btype: [''],
      bprogram: ['60'],
      ptype: [''],
      pprogram: ['60'],
      ftype: [''],
      fprogram: ['60'],
      backColor: ['', Validators.required],
      primerColor: ['', Validators.required],
      finishColor: ['', Validators.required],
      doublecloat: [''],
      country: [''],
      province: [''],
      city: [''],
      figura: [''],
      address: ['', Validators.required],
      tel: ['', Validators.required],
      exdelitime: [''],
      exshiptime: [''],
      pro_system: [''],
      oid: [''],
      username: ['']
    });
  }

  ngOnInit() {
    this.getProSystem();
    this.selectProvince();
    this.cityName = '贵阳';
    this.dateZero();
  }
  dateZero() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    let Omonth: string, Oday: string;
    if (month < 10) {
    Omonth = '0' + month;
    } else {
      Omonth = month.toString();
    }
    if (day < 10) {
      Oday = '0' + day;
    } else {
      Oday = day.toString();
    }
    this.exdelitime = date.getFullYear() + '-' + Omonth + '-' + Oday;
    this.exshiptime = date.getFullYear() + '-' + Omonth + '-' + Oday;
  }
  minMax(program: number) {
    switch (program) {
      case 1: if (this.bprogram < 20) {
        this.bprogram = 20;
      } else if (this.bprogram > 120) {
        this.bprogram = 120;
      }
      break;
      case 2: if (this.pprogram < 20) {
        this.pprogram = 20;
      } else if (this.pprogram > 120) {
        this.pprogram = 120;
      }
      break;
      case 3: if (this.fprogram < 20) {
        this.fprogram = 20;
      } else if (this.fprogram > 120) {
        this.fprogram = 120;
      }
      break;
    }
  }
  getProSystem() {
    this.pro_systemName = this.user.getSysids();
    this.pro_system = this.pro_systemName[0]['sysName'];
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
      const body = {
        delete_id: this.tBody[index]['oid'],
        username: this.user.getName()
      };
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
    this.altype = this.tBody[index]['altype'];
    this.bprogram = this.tBody[index]['bprogram'];
    this.pprogram = this.tBody[index]['pprogram'];
    this.fprogram = this.tBody[index]['fprogram'];
    this.btype = this.tBody[index]['btype'];
    this.ptype = this.tBody[index]['ptype'];
    this.ftype = this.tBody[index]['ftype'];
    this.exdelitime = '20' + this.tBody[index]['exdelitime'].split(' ')[0];
    this.exshiptime = '20' + this.tBody[index]['exshiptime'].split(' ')[0];
    this.countryName = this.tBody[index]['country'];
    this.provinceName = this.tBody[index]['province'];
    this.cityName = this.tBody[index]['city'];
    this.doublecloat = this.tBody[index]['doublecloat'] === 1 ? '是' : '否';
    this.figura = this.tBody[index]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[index]['pro_system']);
    this.order2.patchValue(this.tBody[index]);
    this.formName = this.order2;
    this.btnName = '修改完成';
    console.log(this.tBody[index]);
  }
  submitOrder() {
    this.order = this.formName;
    const body = this.order.value;
    body['altype'] = this.altype;
    body['bprogram'] = this.bprogram;
    body['pprogram'] = this.pprogram;
    body['fprogram'] = this.fprogram;
    body['btype'] = this.btype;
    body['ptype'] = this.ptype;
    body['ftype'] = this.ftype;
    body['pro_system'] = this.getProSystemOid();
    body['doublecloat'] = this.doublecloat === '是' ? 1 : 0;
    body['figura'] = this.figura === '有' ? 1 : 0;
    body['submitter'] = this.user.getObject('user').realName;
    body['country'] = this.countryName;
    body['province'] = this.provinceName;
    body['city'] = this.cityName;
    body['exdelitime'] = this.exdelitime;
    body['exshiptime'] = this.exshiptime;
    body['username'] = this.user.getName();
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
    body['altype'] = this.altype;
    body['bprogram'] = this.bprogram;
    body['pprogram'] = this.pprogram;
    body['fprogram'] = this.fprogram;
    body['btype'] = this.btype;
    body['ptype'] = this.ptype;
    body['ftype'] = this.ftype;
    body['pro_system'] = this.getProSystemOid();
    body['doublecloat'] = this.doublecloat === '是' ? 1 : 0;
    body['figura'] = this.figura === '有' ? 1 : 0;
    body['ostatus'] = this.englishStatus(this.ostatus);
    body['submitter'] = this.user.getObject('user').realName;
    body['country'] = this.countryName;
    body['province'] = this.provinceName;
    body['city'] = this.cityName;
    body['exdelitime'] = this.exdelitime;
    body['exshiptime'] = this.exshiptime;
    body['username'] = this.user.getName();
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
