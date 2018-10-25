import {Component, HostBinding, OnInit} from '@angular/core';
import {LoginIdService} from '../../../login/login-id.service';
import {ScheduleHttpService} from '../schedule-http.service';
import {PageService} from '../../../based/page.service';
import {Order} from '../order';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-order-marketing',
  templateUrl: './order-marketing.component.html',
  styleUrls: ['./order-marketing.component.css'],
})
export class OrderMarketingComponent implements OnInit {
  order = new Order();
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['审核'];
  pro_systemName = [];
  pro_system: string;
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  ostatus: string;
  dataName = [
    ['合同名', '客户名', '单价(元/平方米)', '总价(元)'],
    ['铝板类型', '铝板面积(平方米)', '铝板宽度(毫米)', '铝板厚度(微米)'],
    ['背漆类型', '背漆成像', '背漆方案'],
    ['底漆类型', '底漆成像', '底漆方案'],
    ['面漆类型', '面漆成像', '面漆方案'],
    ['是否双面涂', '国家', '省份', '城市'],
    ['控制误差', '花纹有无', '地址'],
    ['提交人', '修改人'],
    [ '联系电话', '预计交货时间', '预计发货时间', '生产线']
    ];
  modalProp = [
    ['contractname', 'cname', 'price', 'amount'],
    ['altype', 'area', 'alwidth', 'althickness'],
    ['btype', 'bccd', 'bprogram'],
    ['ptype', 'pccd', 'pprogram'],
    ['ftype', 'fccd', 'fprogram'],
    [ 'doublecloat', 'country', 'province', 'city'],
    ['deviation', 'figura', 'address'],
    ['submitter', 'audit'],
    ['tel', 'exdelitime', 'exshiptime', 'pro_system']
  ];
  tips: string;
  tipsColor: string;
  constructor(private http: ScheduleHttpService, private user: LoginIdService,
              public page: PageBetaService, private activatedRoute: ActivatedRoute) {
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/schedule/ordmar');
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
        this.http.SeeOrders(this.page.getPageNo(), this.row, 1, this.proSystem[i]['sysId'])
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
    this.tBody[index]['doublecloat'] = this.tBody[index]['doublecloat'] === 1 ? '是' : '否';
    this.tBody[index]['figura'] = this.tBody[index]['figura'] === 1 ? '有' : '无';
    this.pro_system = this.tBody[index]['pro_system'];
    this.tBody[index]['pro_system'] = this.getProSystemName(this.tBody[index]['pro_system']);
    this.order = this.tBody[index];
    console.log(this.tBody[index]);
  }

  havePass(status) {
    this.order['auditor'] = this.user.getObject('user').realName;
    this.order.status = status;
    this.order['ostatus'] = this.englishStatus(this.ostatus);
    this.order.pro_system = this.pro_system;
    this.order.doublecloat = this.order.doublecloat === '是' ? '1' : '0' ;
    this.order.figura = this.order.figura === '有' ? '1' : '0';
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

  getProSystem() {
    this.pro_systemName = this.user.getSysids();
    console.log(this.pro_systemName, this.user.getSysids());
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

