import {Component, HostBinding, OnInit} from '@angular/core';
import {ProductHttpService} from '../product-http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-entring',
  templateUrl: './product-entring.component.html',
  styleUrls: ['./product-entring.component.css'],
  animations: [slideToRight]
})
export class ProductEntringComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  tHead = ['#', '合同名称', '订单编号', '铝卷单卷编号', '铝卷单卷长度(米)', '单卷出产时间', '操作'];
  prop = ['contractname', 'oid', 'aluminumcode', 'aluminumlength', 'idt'];
  btnGroup = ['打印入库二维码'];
  tBody = [];
  row = 15;
  constructor(private http: ProductHttpService, public page: PageService, private activatedRoute: ActivatedRoute) {
    this.page.setRow(this.row);
    this.page.setUrl('/home/product/proenting');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.initData();
    });
  }
  ngOnInit() {
  }
  initData() {
    this.http.findproduceinformation(this.page.getNowPage(), this.page.getRow())
      .subscribe(data => {
        console.log(data);
        this.page.setPage(data['values']['num']);
        this.tBody = data['values']['produceDTOs'];
      });
  }
  Status(i): string {
    if (i === 0) {
      return '未入库';
    } else if (i === 1) {
      return '正在入库';
    } else if (i === 2) {
      return '已全部入库';
    } else if (i === 4) {
      return '已全出库';
    }
  }
}
export class Order {

  constructor(
    public  oid: string,
    public  aluminumcode: string,
    public  idt: string,
    public  aluminumlength: string
  ) {}
}
