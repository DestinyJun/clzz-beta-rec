import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../product-http.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-product-out',
  templateUrl: './product-out.component.html',
  styleUrls: ['./product-out.component.css'],
})
export class ProductOutComponent implements OnInit {
  tHead = ['#', '合同名称', '订单编号', '生产编号', '铝卷单卷编号', '铝卷单卷长度', '出产时间', '入库时间', '出库时间', '操作'];
  tBody = [];
  prop = ['contractName', 'targetList', 'orderId', 'aluminumCode', 'aluminumLength', 'idt', 'warehousingInDate', 'warehousingOutDate'];
  btnGroup = ['打印已出库二维码'];
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
    this.http.findWareHouseOut(this.pageBeta.getPageNo(), this.pageBeta.getPageSize())
      .subscribe(data => {
        console.log(data);
        this.pageBeta.setTotalPage(data['values']['totalPage']);
        this.tBody = data['values']['contents'];
      });
  }
  searchProduct(contractName) {
    this.http.searchWareHouseOut(contractName).subscribe(data => {
      this.tBody = data['values'];
    });
  }
}
