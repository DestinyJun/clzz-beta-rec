import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../../based/page.service';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @Input() tHead: Array<string>; // 表格头部列式信息
  @Input() fontSize: number; // 字体大小
  @Input() prop: Array<string>; // 类的成员信息排列
  @Input() tBody: Array<object>[]; // 表格主体数据
  @Input() title: string; // 表格标题
  @Input() btnGroup: Array<string> = []; // 按钮组
  @Output() zhuandan = new EventEmitter();
  @Input() page: PageService;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  qrcodeRoute(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['oid'],
      this.tBody[index]['aluminumlength'], this.tBody[index]['targetlist'],
      this.tBody[index]['aluminumcode'], this.tBody[index]['city']]);
  }
  qrcodeRouteN(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['oid'],
      this.tBody[index]['aluminumlength'], this.tBody[index]['targetlist'],
      this.tBody[index]['aluminumcode'], false]);
  }
  qrcodeRouteNT(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['oid'],
      this.tBody[index]['aluminumlength'], false,
      this.tBody[index]['aluminumcode'], false]);
  }
  zhuan(index) {
    this.zhuandan.emit(index);
  }
}
