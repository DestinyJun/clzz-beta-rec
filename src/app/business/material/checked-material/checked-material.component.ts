import { Component, OnInit } from '@angular/core';
import {LoginIdService} from '../../../login/login-id.service';
import {PageService} from '../../../based/page.service';
import {MaterialHttpService} from '../material-http.service';
import {Aluminums} from '../Material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-checked-material',
  templateUrl: './checked-material.component.html',
  styleUrls: ['./checked-material.component.css']
})
export class CheckedMaterialComponent implements OnInit {

  tHead = ['采购单编号', '生产厂家', '入库时间', '单价', '重量', '状态', '操作'];
  prop = ['purchase', 'supname', 'idt', 'alprice', 'alexweight', 'status'];
  btnGroup = ['详情', '打印二维码'];
  tBody = [];
  type = 0;
  url = '/home/material/checked';
  status = 2;
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
