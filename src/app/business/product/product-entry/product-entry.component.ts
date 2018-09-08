import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {asWindowsPath} from '@angular-devkit/core';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css'],
  animations: [slideToRight]
})
export class ProductEntryComponent implements OnInit {
  orders: Array<object>;
  aluminumCode: string;
  oid: string;
  targetList: string;
  tHead = ['#', '合同名称', '订单编号', '生产编号', '铝卷单卷编号', '铝卷单卷长度', '出产时间', '入库时间', '操作'];
  prop = ['contractName', 'targetList', 'orderId', 'aluminumCode', 'aluminumLength', 'wareHousingInDate', 'idt'];
  btnGroup = ['打印出库二维码', '转单'];
  tBody = [];
  row = 15;
  constructor(private http: ProductHttpService, public pageBeta: PageBetaService, private activatedRoute: ActivatedRoute) {
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
    this.http.findFinishedWareHouse(this.pageBeta.getPageNo(), this.pageBeta.getPageSize())
      .subscribe(data => {
        console.log(data);
        this.pageBeta.setTotalPage(data['values']['totalPage']);
        this.tBody = data['values']['contents'];
      });
  }
  confirm(i) {
    if (window.confirm('是否将成品' + this.oid + '转到待生产订单' + i + '?')) {
      this.http.amendorder({targetCode: i, oid: this.oid, aluminumCode: this.aluminumCode})
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
    this.oid = this.tBody[index]['oid'];
    this.aluminumCode = this.tBody[index]['aluminumCode'];
    this.http.findamendorder({targetlist: this.targetList})
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
      });
  }
  searchProduct(contractName) {
    this.http.searchWareHouseIn(contractName).subscribe(data => {
      this.tBody = data['values'];
    });
  }
}

