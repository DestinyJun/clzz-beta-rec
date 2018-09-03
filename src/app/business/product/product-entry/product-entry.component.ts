import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {asWindowsPath} from '@angular-devkit/core';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css'],
  animations: [slideToRight]
})
export class ProductEntryComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  products: Array<Products>;
  orders: Array<object>;
  aluminumcode: string;
  oid: string;
  targetlist: string;
  tHead = ['#', '合同名称', '订单编号', '生产编号', '铝卷单卷编号', '铝卷单卷长度', '出产时间', '入库时间', '操作'];
  prop = ['contractname', 'targetlist', 'oid', 'aluminumcode', 'aluminumlength', 'warehousingindate', 'idt'];
  btnGroup = ['打印出库二维码', '转单'];
  tBody = [];
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
    this.http.findfinishedwarehouse(this.page.getNowPage(), this.page.getRow())
      .subscribe(data => {
        console.log(data);
        this.page.setPage(data['values']['num']);
        this.tBody = data['values']['produceDTOs'];
      });
  }
  confirm(i) {
    if (window.confirm('是否将成品' + this.oid + '转到待生产订单' + i + '?')) {
      this.http.amendorder({targetcode: i, oid: this.oid, aluminumcode: this.aluminumcode})
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
    this.targetlist = this.tBody[index]['targetlist'];
    this.oid = this.tBody[index]['oid'];
    this.aluminumcode = this.tBody[index]['aluminumcode'];
    this.http.findamendorder({targetlist: this.targetlist})
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
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
export class Products {

  constructor(
    public  oid: string,
    public  aluminumlength: string,
    public  aluminumcode: string,
    public  idt: string,
    public warehousingindate: string,
    public targetlist: string
  ) {}
}

