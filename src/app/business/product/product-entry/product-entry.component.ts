import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {asWindowsPath} from '@angular-devkit/core';
import {slideToRight} from '../../../routeAnimation';

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
  constructor(private http: ProductHttpService) {
    this.http.findfinishedwarehouse()
      .subscribe(data => {
        this.products = data['values'];
      });
  }
  ngOnInit() {
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
  SeeOrders(j, i, k): void {
    this.targetlist = k;
    this.aluminumcode = j;
    this.oid = i;
    this.http.findamendorder({targetlist: k})
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

