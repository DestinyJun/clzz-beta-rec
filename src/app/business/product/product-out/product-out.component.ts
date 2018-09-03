import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-out',
  templateUrl: './product-out.component.html',
  styleUrls: ['./product-out.component.css'],
  animations: [slideToRight]
})
export class ProductOutComponent implements OnInit {
  orders: Order[] = [];
  tHead = ['#', '合同名称', '订单编号', '生产编号', '铝卷单卷编号', '铝卷单卷长度', '出产时间', '入库时间', '出库时间', '操作'];
  tBody = [];
  prop = ['contractname', 'targetlist', 'oid', 'aluminumcode', 'aluminumlength', 'idt', 'warehousingindate', 'warehousingoutdate'];
  btnGroup = ['打印已出库二维码'];
  row = 15;
  constructor(private http: ProductHttpService, public page: PageService, private activatedRoute: ActivatedRoute) {
    this.page.setRow(this.row);
    this.page.setUrl('/home/product/procent');
    this.activatedRoute.params.subscribe(() => {
      this.page.setNowPage(this.activatedRoute.snapshot.params['page']);
      this.initData();
    });
  }
  ngOnInit() {
  }
  initData() {
    this.http.findwarehouseout(this.page.getNowPage(), this.page.getRow())
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
    public  warehousingindate: string,
    public  idt: string,
    public  warehousingoutdate: string,
    public  aluminumcode: string,
    public aluminumlength: string,
    public targetlist: string,
    public city: string
  ) {}
}
