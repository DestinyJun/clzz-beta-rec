import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {slideToRight} from '../../../routeAnimation';

@Component({
  selector: 'app-product-out',
  templateUrl: './product-out.component.html',
  styleUrls: ['./product-out.component.css'],
  animations: [slideToRight]
})
export class ProductOutComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  orders: Order[] = [];
  constructor(private http: ProductHttpService) {
    this.http.findwarehouseout()
      .subscribe(data => {
        this.orders = data['values'];
        console.log(data);
      });
  }
  ngOnInit() {
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
