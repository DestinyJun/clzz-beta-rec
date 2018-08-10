import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MaterialHttpService} from '../material-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {MaterialEntryComponent} from '../material-entry/material-entry.component';

@Component({
  selector: 'app-material-check',
  templateUrl: './material-check.component.html',
  styleUrls: ['./material-check.component.css'],
  animations: [slideToRight]
})
export class MaterialCheckComponent implements OnInit {
  tHead = ['采购单编号', '生产厂家', '入库时间', '单价', '重量', '状态', '操作'];
  prop = ['purchase', 'supname', 'idt', 'alprice', 'alexweight', 'status'];
  btnGroup = ['详情'];
  tBody = [];
  type = 0;
  url = '/home/material/matche';
  status = 0;
  toggleBtn: any;
  btn = '提交';
  constructor(private materialHttp: MaterialHttpService, public page: PageService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.page.setRow(20);
    this.page.setUrl(this.url);
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.getData(this.type);
    });
  }

  ngOnInit() {
  }
  getData(type) {
    this.type = type;
    console.log(type);
    const body = {
      sysids: this.user.getObject('user').sysids,
      page: this.page.getNowPage(),
      row: this.page.getRow(),
      mode: this.type,
      status: this.status
    };
    this.materialHttp.findrawpage(body).subscribe(data => {
      console.log(data);
      this.tBody = data['values']['datas'];
      this.page.setPage(data['values']['num']);
    });
  }
}
