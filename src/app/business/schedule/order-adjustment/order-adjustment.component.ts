import {Component, HostBinding, OnInit} from '@angular/core';
import {ScheduleHttpService} from '../schedule-http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-adjustment',
  templateUrl: './order-adjustment.component.html',
  styleUrls: ['./order-adjustment.component.css'],
  animations: [slideToRight]
})
export class OrderAdjustmentComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
  tBody = [];
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'status'];
  btnGroup = ['下移'];
  oid = new Oid();
  constructor(private http: ScheduleHttpService, private activatedRoute: ActivatedRoute,  public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordadj');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
  }
  down(j) {
    console.log(j);
    this.http.OrderMobileFunction({
      oidone: this.tBody[j]['oid'] ,
      oidtwo: this.tBody[j + 1]['oid'],
      priorityone: this.tBody[j]['priority'],
      prioritytwo: this.tBody[j + 1]['priority']
    })
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  SeeOrders() {
    this.http.OrderAudited()
      .subscribe(data => {
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
        this.page.setPage(20);
      });
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
