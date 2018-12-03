import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {ScheduleHttpService} from '../schedule-http.service';
import {Order} from '../order';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
import {dataName, modalProp} from '../order-query/queryList';

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
  ostatus: string;
  oid: string;
  tHead = ['订单编号', '项目名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['审核'];
  dataName = dataName;
  modalProp = modalProp;
  tips: string;
  tipsColor: string;
  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
  private user: LoginIdService, public page: PageBetaService) {
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/true/schedule/ordcra');
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
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
  modalValue(index) {
    this.ostatus = this.tBody[index]['ostatus'];
    this.order = this.tBody[index];
    this.tBody[index]['doublecloat'] = this.tBody[index]['doublecloat'] === 1 ? '是' : '否';
    this.tBody[index]['figura'] = this.tBody[index]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.getProSystemName(this.tBody[index]['pro_system']);
    this.oid = this.tBody[index]['oid'];
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

  havePass(status) {
    this.order.pro_auditor = this.user.getObject('user').realName;
    this.order.pro_system = this.getProSystemOid();
    this.order.status = status;
    this.order.doublecloat = this.order.doublecloat === '是' ? '1' : '0' ;
    this.order.figura = this.order.figura === '有' ? '1' : '0';
    this.order['ostatus'] = this.englishStatus(this.ostatus);
    this.order['username'] = this.user.getName();
    this.http.UpdateOrders(this.order)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
        if (data['status'] === '10') {
          this.tips = '设置成功!';
          this.tipsColor = '#5cb85c';
        } else {
          this.tips = '设置失败!';
          this.tipsColor = '#d9534f';
        }
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
