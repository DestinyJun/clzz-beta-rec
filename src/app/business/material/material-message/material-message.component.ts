import {Component, HostBinding, OnInit} from '@angular/core';
import {MaterialHttpService} from '../material-http.service';
import {slideToRight} from '../../../routeAnimation';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {PageService} from '../../../based/page.service';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css'],
  animations: [slideToRight]
})
export class MaterialMessageComponent implements OnInit {
  tHead = ['类型', '采购单编号', '生产厂家', '入库时间', '单价', '重量', '状态', '操作'];
  prop = ['purchase', 'supname', 'idt', 'alprice', 'alexweight', 'status'];
  btnGroup = ['详情'];
  tBody = [];
  type = 0;
  url = '/home/material/checked';
  status = 2;
  PtArr = [];
  PtdArr = [];
  AlArr = [];
  material: any;
  btn = '审核';
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
  toggleBtn(type) {
    this.type = type;
    this.getData(this.type);
  }
  readType() {
    if (this.type === 0) {
      return '铝板';
    } else if (this.type === 1) {
      return '油漆';
    }
  }
  modalValue(index) {
    this.material = this.tBody[index];
    console.log(this.tBody[index]);
    if (this.type === 0) {
      this.materialHttp.SeeAluminum({purchase: this.tBody[index]['purchase']})
        .subscribe(data => {
          console.log(data);
          this.AlArr = data['data'][0]['arr'];
          this.PtArr = this.PtdArr = [];
        });
    } else {
      this.materialHttp.SeePaint({purchase: this.tBody[index]['purchase']})
        .subscribe(data => {
          console.log(data);
          this.PtArr = data['data1'][0]['arr1'];
          this.PtdArr = data['data2'][0]['arr2'];
          this.AlArr = [];
        });
    }
  }
  havePass(status) {
    switch (this.type) {
      case 0: this.materialHttp.updateal({
        purchase: this.material['purchase'],
        pro_auditor: this.user.getObject('user').realName,
        status: status
      }).subscribe(data => {
        console.log(data);
      });
      this.getData(this.type);
      break;
      case 1: this.materialHttp.allauditpa({
        purchase: this.material['purchase'],
        pro_auditor: this.user.getObject('user').realName,
        status: status
      }).subscribe(data => {
        console.log(data);
      });
        this.getData(this.type);
        break;
    }
  }
}
