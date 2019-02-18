import { Component, OnInit } from '@angular/core';
import {MaterialHttpService} from '../material-http.service';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-failed-material',
  templateUrl: './failed-material.component.html',
  styleUrls: ['./failed-material.component.css']
})
export class FailedMaterialComponent implements OnInit {

  tHead = ['合金状态', '采购单编号', '生产厂家', '入库时间', '总重量（吨）', '状态', '操作'];
  prop = ['alType', 'purchase', 'supName', 'idt', 'alExpectWeight', 'status'];
  btnGroup = ['详情'];
  tBody = [];
  type = 0;
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  url = '/home/material/failed';
  status = 1;
  constructor(private materialHttp: MaterialHttpService, public page: PageBetaService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.page.setPageSize(this.row);
    this.page.setUrl(this.url);
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.getData();
    });
  }

  ngOnInit() {
  }
  toggleType(type) {
    this.type = type;
    if (type === 0) {
      this.tHead = ['合金状态', '采购单编号', '生产厂家', '入库时间', '总重量（吨）', '状态', '操作'];
      this.prop = ['alType', 'purchase', 'supName', 'idt', 'alExpectWeight', 'status'];
    } else {
      this.tHead = ['油漆类型', '采购单编号', '生产厂家', '入库时间', '总重量（吨）', '状态', '操作'];
      this.prop = ['pType', 'purchase', 'supName', 'idt', 'paExpectWeight', 'status'];
    }
    this.getData();
  }
  selectSystem(name) {
    if (this.proSystemName !== name) {
      this.proSystemName = name;
      this.getData();
    }
  }
  getData() {
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        const body = {
          sysids: this.proSystem[i]['sysId'],
          page: this.page.getPageNo(),
          row: this.row,
          mode: this.type,
          status: this.status
        };
        this.materialHttp.findrawpage(body).subscribe(data => {
          console.log(data);
          if (data['values']['contents'] !== null) {
            this.tBody = data['values']['contents'];
            this.page.setTotalPage(data['values']['totalPage']);
          } else {
            this.tBody = [];
          }
        });
      }
    }
  }
}
