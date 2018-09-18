import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {asWindowsPath} from '@angular-devkit/core';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css'],
  animations: [slideToRight]
})
export class ProductEntryComponent implements OnInit {
  aluminumCode: string;
  name: string;
  targetList: string;
  tHead = ['#', '合同名称', '订单编号', '生产编号', '铝卷单卷编号', '铝卷单卷长度', '出产时间', '入库时间', '操作'];
  prop = ['contractName', 'targetList', 'orderId', 'aluminumCode', 'aluminumLength', 'idt', 'warehousingInDate'];
  btnGroup = ['打印出库二维码', '转单'];
  tBody = [];
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  burster = true;
  menuHead = ['#', '合同名称', '转单'];
  menuProp = ['contractName'];
  menuBody = [];
  constructor(private http: ProductHttpService, public pageBeta: PageBetaService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.pageBeta.setPageSize(this.row);
    this.pageBeta.setUrl('/home/product/procent');
    this.activatedRoute.params.subscribe(() => {
      this.pageBeta.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.initData();
    });

  }
  ngOnInit() {
  }

  initData() {
    this.burster = true;
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystemName === this.proSystem[i]['sysName']) {
        this.http.findFinishedWareHouse(this.pageBeta.getPageNo(), this.pageBeta.getPageSize(), this.proSystem[i]['sysId'])
          .subscribe(data => {
            console.log(data);
            this.pageBeta.setTotalPage(data['values']['totalPage']);
            this.tBody = data['values']['contents'];
          });
      }
    }
  }
  confirm(index) {
    const name = this.tBody[index]['contractName'];
    if (window.confirm('是否将' + this.name + '转到待生产订单' + name + '?')) {
      this.http.amendorder({targetCode: this.tBody[index]['targetList'],
        oid: this.tBody[index]['orderId'], aluminumCode: this.aluminumCode})
        .subscribe(data => {
          if (data['status'] === '10') {
            window.confirm('转单成功');
          } else {
            window.confirm('转单失败');
          }
        });
    }
  }
  zhuan(index): void {
    this.targetList = this.tBody[index]['targetList'];
    this.name = this.tBody[index]['contractName'];
    this.aluminumCode = this.tBody[index]['aluminumCode'];
    this.http.findamendorder({targetList: this.targetList})
      .subscribe(data => {
        console.log(data);
        this.menuBody = data['values'];
      });
  }
  searchProduct(contractName) {
    this.burster = false;
    this.http.searchWareHouseIn(contractName).subscribe(data => {
      this.tBody = data['values'];
    });
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.initData();
    }
  }
}

