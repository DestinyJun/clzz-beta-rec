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
  prop = ['oid', 'cname', 'contractname', 'exdelitime', 'submitter', 'ostatus'];
  btnGroup = ['上移', '下移'];
  oid = new Oid();
  constructor(private http: ScheduleHttpService, private activatedRoute: ActivatedRoute,  public page: PageService) {
    this.page.setRow(20);
    this.page.setUrl('/home/schedule/ordadj');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.SeeOrders();
    });
  }
  Status(i) {
    if (i === 1) {
      return '准备生产';
    } else if (i === 2) {
      return '准备生产';
    } else if (i === 3) {
      return '正常暂停生产';
    } else if (i === 4) {
      return '异常暂停生产';
    } else if (i === 5) {
      return '单次生产完成';
    }
  }
  up(j) {
    this.http.OrderMobileFunction({
      oidone: this.tBody[j]['oid'] ,
      oidtwo: this.tBody[j - 1]['oid'],
      priorityone: this.tBody[j]['priority'],
      prioritytwo: this.tBody[j - 1]['priority']
    })
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  down(j) {
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
        this.tBody = data['values'];
        for (let i = 0; i < this.tBody.length; i++) {
          for ( let j = i + 1; j < this.tBody.length; j++) {
            if (this.tBody[j].priority < this.tBody[i].priority) {
              const od = this.tBody[j];
              this.tBody[j] = this.tBody[i];
              this.tBody[i] = od;
            }
          }
        }
        this.page.setPage(data['values'].length);
      });
  }
  ngOnInit() {}
}
export class Oid {
  oidone: string;
  oidtwo: string;
}
