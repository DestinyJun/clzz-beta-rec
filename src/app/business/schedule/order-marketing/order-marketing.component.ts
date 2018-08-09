import {Component, HostBinding, OnInit} from '@angular/core';
import {LoginIdService} from '../../../login/login-id.service';
import {ScheduleHttpService} from '../schedule-http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {Order} from '../order';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-marketing',
  templateUrl: './order-marketing.component.html',
  styleUrls: ['./order-marketing.component.css'],
  animations: [slideToRight]
})
export class OrderMarketingComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  order = new Order();
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['审核'];
  dataName = [
    ['合同名', '客户名', '单价', '总价:'],
    ['铝板类型', '铝板长度', '铝板宽度', '铝板厚度'],
    ['背漆类型', '背漆方案选择', '背漆左厚度', '背漆湿膜厚度'],
    ['背漆成像', '背漆干膜修正', '背漆湿膜修正 '],
    ['面漆类型 ', '面漆厚度', '面漆湿膜厚度', '面漆方案'],
    ['面漆生产线:', '面漆干膜修正', '面漆湿膜修正', '花纹'],
    ['底漆类型', '底漆厚度', '底漆湿膜厚度', '底漆成像'],
    ['底漆干膜修正', '底漆湿膜修正', '底漆生产线', '是否双面涂'],
    ['Id', '状态', '控制误差', '审核人'],
    ['提交人', '录入员', '录入时间'],
    ['地址', '联系电话', '预计交货时间', '预计发货时间']
    ];
  modalProp = [
    ['contractname', 'cname', 'price', 'amount'],
    ['altype', 'allength', 'alwidth', 'althickness'],
    ['btype', 'bprogram', 'bchickness', 'bchicknessw'],
    ['bccd', 'bdry_film', 'bwet_film'],
    ['ftype', 'fthickness', 'fthicknessw', 'fccd'],
    ['fprogram', 'fdry_film', 'fwet_film', 'figure'],
    ['ptype', 'pthicknessw', 'pthickness', 'pccd'],
    ['pdry_film', 'pwet_film', 'pprogram', 'doublecloat'],
    ['oid', 'ostatus', 'deviation', 'auditor'],
    ['submitter', 'audit', 'audittime'],
    ['address', 'tel', 'exdelitime', 'exshiptime']
  ];
  constructor(private http: ScheduleHttpService, private user: LoginIdService,
              public page: PageService, private activatedRoute: ActivatedRoute) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordmar');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
  }

  ngOnInit() {
  }
  SeeOrders() {
    this.http.SeeOrders(this.page.getNowPage(), this.page.getRow(), 1)
      .subscribe(data => {
        console.log(data);
        this.tBody = data['values']['datas'];
        this.page.setPage(Number(data['values']['number']));
      });
  }
  modalValue(value) {
    this.order = this.tBody[value];
    console.log(value);
  }

  havePass(status) {
    this.order['auditor'] = this.user.getObject('user').realName;
    this.order.ostatus = status;
    this.http.UpdateOrders(this.order)
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

