import {Component, OnInit} from '@angular/core';
import {MaterialHttpService} from '../material-http.service';
import {slideToRight} from '../../../routeAnimation';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css'],
  animations: [slideToRight]
})
export class MaterialMessageComponent implements OnInit {
  tHead = ['合金状态', '采购单编号', '生产厂家', '入库时间', '总重量（吨）', '状态', '操作'];
  prop = ['alType', 'purchase', 'supName', 'idt', 'alExpectWeight', 'status'];
  btnGroup = ['详情'];
  tBody = [];
  type = 0;
  url = '/home/material/checked';
  status = 1;
  PtArr = [];
  PtdArr = [];
  AlArr = [];
  material: any;
  btn = '审核';
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  tips: string;
  tipsHidden: boolean;
  tipsColor: string;
  constructor(private materialHttp: MaterialHttpService, public page: PageBetaService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService,
              private router: Router) {
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
  toggleBtn(type) {
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
  statusC(status) {
    switch (status) {
      case 1: return '未审核';
      case 2: return '已审核';
      case 3: return '审核未通过';
    }
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
        status: status,
        username: this.user.getName()
      }).subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.qrCode();
        } else {
          this.tips = data['14'];
          this.tipsColor = '#d9534f';
          this.tipHiddening();
        }
      });
      this.getData();
      break;
      case 1: this.materialHttp.allauditpa({
        purchase: this.material['purchase'],
        pro_auditor: this.user.getObject('user').realName,
        status: status,
        username: this.user.getName()
      }).subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.qrCode();
        } else {
            this.tips = data['14'];
            this.tipsColor = '#d9534f';
            this.tipHiddening();
        }
      });
        this.getData();
        break;
    }
  }
  qrCode() {
    const url = '/qrcode/' + this.material['purchase'] + '/' + this.type + '/1/1/1/1/1';
    this.router.navigate([url]);
  }
  tipHiddening() {
    console.log(1);
    this.tipsHidden = true;
    setTimeout(() => this.tipsHidden = false, 2000);
  }
}
