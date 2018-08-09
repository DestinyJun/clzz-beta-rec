import { Component, OnInit } from '@angular/core';
import {MaterialHttpService} from '../material-http.service';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-unaudited-material',
  templateUrl: './unaudited-material.component.html',
  styleUrls: ['./unaudited-material.component.css']
})
export class UnauditedMaterialComponent implements OnInit {

  tHead = ['采购单编号', '生产厂家', '入库时间', '单价', '重量', '状态', '操作'];
  prop = ['purchase', 'supname', 'idt', 'alprice', 'alexweight', 'status'];
  btnGroup = ['详情'];
  tBody = [];
  type = 0;
  url = '/home/material/failed';
  status = 1;
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
      this.page.setPage(data['values']['number']);
    });
  }
}
