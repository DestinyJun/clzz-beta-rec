import {Component, HostBinding, OnInit} from '@angular/core';
import {ProductHttpService} from '../product-http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-product-entring',
  templateUrl: './product-entring.component.html',
  styleUrls: ['./product-entring.component.css'],
})
export class ProductEntringComponent implements OnInit {
  tHead = ['#', '合同名称', '订单编号', '铝卷单卷编号', '铝卷单卷长度(米)', '单卷出产时间', '操作'];
  prop = ['contractName', 'orderId', 'aluminumCode', 'aluminumLength', 'idt'];
  btnGroup = ['打印入库二维码'];
  tBody = [];
  pageSize = 15;
  constructor(private http: ProductHttpService, public pageBeta: PageBetaService, private activatedRoute: ActivatedRoute) {
    this.pageBeta.setPageSize(this.pageSize);
    this.pageBeta.setUrl('/home/product/proenting');
    this.activatedRoute.params.subscribe(() => {
      this.pageBeta.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.initData();
    });
  }
  ngOnInit() {
  }
  initData() {
    this.http.findproduceinformation(this.pageBeta.getPageNo(), this.pageBeta.getPageSize())
      .subscribe(data => {
        console.log(data);
        this.pageBeta.setTotalPage(data['values']['totalPage']);
        this.tBody = data['values']['contents'];
        console.log(this.tBody);
      });
  }
  searchProduct(contractName) {
    this.http.searchFinishedProduct(contractName).subscribe(data => {
      console.log(data);
      this.tBody = data['values'];
    });
  }
}
