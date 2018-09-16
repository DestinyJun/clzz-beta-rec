import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {ScheduleHttpService} from '../schedule-http.service';
import {Order} from '../order';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-order-craft',
  templateUrl: './order-craft.component.html',
  styleUrls: ['./order-craft.component.css'],
})
export class OrderCraftComponent implements OnInit {
  order = new Order();
  film: FormGroup;
  pro_systemName = [];
  pro_system: string;
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  pageOrder: PageBetaService;
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['审核'];
  dataName = [
    ['合同名', '客户名', '单价', '总价:'],
    ['铝板类型', '铝板长度', '铝板宽度', '铝板厚度'],
    ['背漆类型', '背漆方案选择', '背漆厚度', '背漆湿膜厚度'],
    ['背漆成像', '底漆方案', '底漆湿膜厚度', '面漆方案'],
    ['面漆类型 ', '面漆厚度', '面漆方案', '花纹'],
    ['底漆类型', '底漆厚度', '底漆湿膜厚度', '底漆成像'],
    ['Id', '状态', '控制误差', '是否双面涂'],
    ['提交人', '修改人', '录入时间', '地址'],
    [ '联系电话', '预计交货时间', '预计发货时间']
  ];
  modalProp = [
    ['contractname', 'cname', 'price', 'amount'],
    ['altype', 'allength', 'alwidth', 'althickness'],
    ['btype', 'bprogram', 'bchickness', 'bchicknessw'],
    ['bccd', 'pprogram', 'pthicknessw', 'pccd'],
    ['ftype', 'fthickness', 'fprogram', 'figure'],
    ['ptype', 'pthickness', 'pthicknessw', 'pccd'],
    ['oid', 'ostatus', 'deviation', 'doublecloat'],
    ['submitter', 'audit', 'audittime', 'address'],
    ['tel', 'exdelitime', 'exshiptime']
  ];
  craftName = [
    ['面漆干膜修正(微米)', '面漆湿膜修正(微米)', '底漆干膜修正(微米)', '底漆湿膜修正(微米)'],
    ['背漆干膜修正(微米)', '背漆湿膜修正(微米)']
  ];
  craftProp = [
    ['fdry_film', 'fwet_film', 'bdry_film', 'bwet_film'],
    ['pdry_film', 'pwet_film']
  ];
  craftType = [
    ['number', 'number', 'number', 'number'],
    ['number', 'number', 'type']
  ];
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
  private user: LoginIdService, public page: PageBetaService) {
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/schedule/ordcra');
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
    this.film = this.fb.group({
      fdry_film: ['', Validators.required],
      fwet_film: ['', Validators.required],
      bdry_film: ['', Validators.required],
      bwet_film: ['', Validators.required],
      pdry_film: ['', Validators.required],
      pwet_film: ['', Validators.required],
      pro_system: [''],
    });
  }


  ngOnInit() {
    this.getProSystem();
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.SeeOrders();
    }
  }
  SeeOrders() {
    if (this.page.boolUrl === false) {
      this.page.boolUrl = true;
    }
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        this.http.SeeOrders(this.page.getPageNo(), this.row, 2, this.proSystem[i]['sysId'])
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
  modalValue(value) {
    this.order = this.tBody[value];
    this.tBody[value]['doublecloat'] = this.tBody[value]['doublecloat'] === 1 ? '是' : '否';
    this.tBody[value]['figura'] = this.tBody[value]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[value]['pro_system']);
    console.log(value);
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
  havePass(status) {
    this.order.pro_auditor = this.user.getObject('user').realName;
    this.order.fdry_film = this.film.get('fdry_film').value;
    this.order.fwet_film = this.film.get('fwet_film').value;
    this.order.pdry_film = this.film.get('pdry_film').value;
    this.order.pwet_film = this.film.get('pwet_film').value;
    this.order.bdry_film = this.film.get('bdry_film').value;
    this.order.bwet_film = this.film.get('bwet_film').value;
    this.order.pro_system = this.getProSystemOid();
    this.order.status = status;
    this.order.doublecloat = this.order.doublecloat === '是' ? '1' : '0' ;
    this.order.figura = this.order.figura === '有' ? '1' : '0';
    this.http.UpdateOrders(this.order)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
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

}
