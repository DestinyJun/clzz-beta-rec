import {Component, OnInit} from '@angular/core';
import {ScheduleHttpService} from '../schedule-http.service';
import {ActivatedRoute} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-order-adjustment',
  templateUrl: './order-adjustment.component.html',
  styleUrls: ['./order-adjustment.component.css'],
})
export class OrderAdjustmentComponent implements OnInit {
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['orderId', 'cName', 'contractName', 'exdelitime', 'submitter', 'status'];
  btnGroup = ['下移'];
  oid = new Oid();
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  constructor(private http: ScheduleHttpService, private activatedRoute: ActivatedRoute,
              public page: PageBetaService, private user: LoginIdService) {
    this.page.setPageSize(this.row);
    this.page.setUrl('/home/schedule/ordadj');
    this.activatedRoute.params.subscribe(() => {
      this.page.setTotalPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
  }
  down(j) {
    console.log(j);
    this.http.OrderMobileFunction({
      orderIdOne: this.tBody[j]['orderId'] ,
      orderIdTwo: this.tBody[j + 1]['orderId'],
      priorityOne: this.tBody[j]['priority'],
      priorityTwo: this.tBody[j + 1]['priority']
    })
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  SeeOrders() {
    for (let _i = 0; _i < this.proSystem.length; _i++) {
      if (this.proSystemName === this.proSystem[_i]['sysName']) {
        this.http.OrderAudited(this.proSystem[_i]['sysId']).subscribe(data => {
          console.log(data['values']);
          this.tBody = data['values'];
          for (let i = 0; i < this.tBody.length; i++) {
            this.tBody[i]['status'] = this.chineseStatus(Number(this.tBody[i]['status']));
          }
          for (let i = 0; i < this.tBody.length; i++) {
            for ( let j = i + 1; j < this.tBody.length; j++) {
              if (this.tBody[j].priority < this.tBody[i].priority) {
                const od = this.tBody[j];
                this.tBody[j] = this.tBody[i];
                this.tBody[i] = od;
              }
            }
          }
        });
      }
    }
  }
  chineseStatus(status: number) {
    switch (status) {
      case 1: return '准备生产';
      case 2: return '正在生产....';
      case 3: return '生产停机';
    }
  }
  ngOnInit() {}
}
export class Oid {
  oidone: string;
  oidtwo: string;
}
