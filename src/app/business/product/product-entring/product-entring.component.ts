import {Component, HostBinding, OnInit} from '@angular/core';
import {ProductHttpService} from '../product-http.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-product-entring',
  templateUrl: './product-entring.component.html',
  styleUrls: ['./product-entring.component.css'],
})
export class ProductEntringComponent implements OnInit {
  tHead = ['#', '生产批号', '项目名称', '订单编号', '铝卷单卷编号', '铝卷单卷长度(米)', '单卷出产时间', '操作'];
  prop = ['proBatchNumber', 'customerName', 'orderId', 'aluminumCode', 'aluminumLength', 'idt'];
  btnGroup = ['打印入库二维码'];
  tBody = [];
  proSystem = this.user.getSysids();
  row = 15;
  proSystemName = this.proSystem[0]['sysName'];
  burster = true;
  constructor(private http: ProductHttpService, public pageBeta: PageBetaService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.pageBeta.setPageSize(this.row);
    this.pageBeta.setUrl('/home/true/product/proenting');
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
        this.http.findproduceinformation(this.pageBeta.getPageNo(), this.pageBeta.getPageSize(), this.proSystem[i]['sysId'])
          .subscribe(data => {
            console.log(data);
            this.pageBeta.setTotalPage(data['values']['totalPage']);
            this.tBody = data['values']['contents'];
          });
      }
    }
  }
  searchProduct(contractName) {
    this.burster = false;
    this.http.searchFinishedProduct(contractName).subscribe(data => {
      console.log(data);
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
