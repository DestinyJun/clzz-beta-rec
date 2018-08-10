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
  order: FormGroup;
  order2: FormGroup;
  formName: FormGroup;
  orderOid: string;
  btnName = '提交';
  doublecloat: string;
  pro_system: string;
  figura: string;
  pro_systemName = [];
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['修改', '删除'];
  dataName = [
    ['合同名', '客户名', '单价(元/平方米)', '总价(元)'],
    ['铝板类型', '铝板面积(平方米)', '铝板宽度(毫米)', '铝板厚度(微米)'],
    ['背漆类型', '背漆成像', '背漆方案'],
    ['底漆类型', '底漆成像', '底漆方案'],
    ['面漆类型', '面漆成像', '面漆方案'],
    ['联系电话', '国家', '省份', '城市'],
    ['控制误差', '预计交货时间', '预计发货时间', '地址'],
  ];
  propType = [
    ['type', 'type', 'number', 'number'],
    ['type', 'number', 'number', 'number'],
    ['type', 'type', 'number'],
    ['type', 'type', 'number'],
    ['type', 'type', 'number'],
    ['type', 'type', 'type', 'type'],
    ['number', 'date', 'date', 'type'],
  ];
  modalProp = [
    ['contractname', 'cname', 'price', 'amount'],
    ['altype', 'area', 'alwidth', 'althickness'],
    ['btype', 'bccd', 'bprogram'],
    ['ptype', 'pccd', 'pprogram'],
    ['ftype', 'fccd', 'fprogram'],
    [ 'tel', 'country', 'province', 'city'],
    ['deviation', 'exdelitime', 'exshiptime', 'address']
  ];
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private user: LoginIdService,
              public page: PageService, private activatedRoute: ActivatedRoute) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordque');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
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
      if (this.pro_system === this.pro_systemName[i]['name']) {
        return this.pro_systemName[i]['sid'];
      }
    }
  }
  getProSystemName(pro_systemSid) {
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (pro_systemSid === this.pro_systemName[i]['sid']) {
        return this.pro_systemName[i]['name'];
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
  SeeOrders() {
    this.http.SeeOrders(this.page.getNowPage(), this.page.getRow(), 0)
      .subscribe(data => {
        console.log(data);
        this.tBody = data['values']['datas'];
        for (let i = 0; i < this.tBody.length; i++) {
          this.tBody[i]['ostatus'] = this.chineseStatus(Number(this.tBody[i]['ostatus']));
        }
        this.page.setPage(data['values']['number']);
      });
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
