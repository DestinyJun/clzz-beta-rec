import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductHttpService} from '../product-http.service';
import {slideToRight} from '../../../routeAnimation';

@Component({
  selector: 'app-product-entring',
  templateUrl: './product-entring.component.html',
  styleUrls: ['./product-entring.component.css'],
  animations: [slideToRight]
})
export class ProductEntringComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  public orders: Order[] = [];
  constructor(private http: ProductHttpService) {
    this.http.findproduceinformation()
      .subscribe(data => {
        console.log('--------------------------');
        console.log(data);
        this.orders = data['values'];
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
    public  aluminumcode: string,
    public  idt: string,
    public  aluminumlength: string
  ) {}
}
