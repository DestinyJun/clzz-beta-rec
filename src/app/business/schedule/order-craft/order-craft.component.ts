import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {ScheduleHttpService} from '../schedule-http.service';
import {slideToRight} from '../../../routeAnimation';
import {ToastService} from '../../../remind/toast.service';
import {Order} from '../order';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-craft',
  templateUrl: './order-craft.component.html',
  styleUrls: ['./order-craft.component.css'],
  animations: [slideToRight]
})
export class OrderCraftComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  order = new Order();
  film: FormGroup;
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['审核'];
  dataName = [
    ['合同名', '客户名', '单价', '总价:'],
    ['铝板类型', '铝板长度', '铝板宽度', '铝板厚度'],
    ['背漆类型', '背漆方案选择', '背漆厚度', '背漆湿膜厚度'],
    ['背漆成像', '底漆生产线', '底漆湿膜厚度', '面漆方案'],
    ['面漆类型 ', '面漆厚度', '面漆生产线', '花纹'],
    ['底漆类型', '底漆厚度', '底漆湿膜厚度', '底漆成像'],
    ['Id', '状态', '控制误差', '是否双面涂'],
    ['提交人', '录入员', '录入时间', '审核人'],
    ['地址', '联系电话', '预计交货时间', '预计发货时间']
  ];
  modalProp = [
    ['contractname', 'cname', 'price', 'amount'],
    ['altype', 'allength', 'alwidth', 'althickness'],
    ['btype', 'bprogram', 'bchickness', 'bchicknessw'],
    ['bccd', 'pprogram', 'pthicknessw', 'pccd'],
    ['ftype', 'fthickness', 'fprogram', 'figure'],
    ['ptype', 'pthickness', 'pthicknessw', 'pccd'],
    ['oid', 'ostatus', 'deviation', 'doublecloat'],
    ['submitter', 'audit', 'audittime', 'auditor'],
    ['address', 'tel', 'exdelitime', 'exshiptime']
  ];
  craftName = [
    ['面漆干膜修正', '面漆湿膜修正', '底漆干膜修正', '底漆湿膜修正'],
    ['背漆干膜修正', '背漆湿膜修正', '系统生产线']
  ];
  craftProp = [
    ['fdry_film', 'fwet_film', 'bdry_film', 'bwet_film'],
    ['pdry_film', 'pwet_film', 'pro_system']
  ];

  constructor(private http: ScheduleHttpService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
  private user: LoginIdService, public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordcra');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
    this.film = this.fb.group({
      fdry_film: ['', Validators.required],
      fwet_film: ['', Validators.required],
      bdry_film: ['', Validators.required],
      bwet_film: ['', Validators.required],
      pdry_film: ['', Validators.required],
      pwet_film: ['', Validators.required],
      pro_system: ['', Validators.required],
    });
  }


  ngOnInit() {
  }
  SeeOrders() {
    this.http.SeeOrders(this.page.getNowPage(), this.page.getRow(), 2)
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
  havePass(status) {
    this.order['auditor'] = this.user.getObject('user').realName;
    this.order.fdry_film = this.film.get('fdry_film').value;
    this.order.fwet_film = this.film.get('fwet_film').value;
    this.order.pdry_film = this.film.get('pdry_film').value;
    this.order.pwet_film = this.film.get('pwet_film').value;
    this.order.bdry_film = this.film.get('bdry_film').value;
    this.order.bwet_film = this.film.get('bwet_film').value;
    this.order.pro_system = this.film.get('pro_system').value;
    this.order.ostatus = status;
    this.http.UpdateOrders(this.order)
      .subscribe(data => {
        console.log(data);
        this.SeeOrders();
      });
  }

}
