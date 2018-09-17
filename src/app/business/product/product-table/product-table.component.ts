import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PageService} from '../../../based/page.service';
import {PageBetaService} from '../../../based/page-beta.service';
import {LoginIdService} from '../../../login/login-id.service';
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
  @Input() page: PageBetaService;
  @Output() search = new EventEmitter();
  @Output() searchOf = new EventEmitter();
  proSystem = this.user.getSysids();
  @Output() sProSystem = new EventEmitter();
  searchStatus: boolean;
  constructor(private router: Router, private user: LoginIdService) { }
  @Input() burster: boolean;
  ngOnInit() {
    this.searchStatus = false;
  }

  qrcodeRoute(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['orderId'],
      this.tBody[index]['aluminumLength'], this.tBody[index]['targetList'],
      this.tBody[index]['aluminumCode'], this.tBody[index]['city']]);
  }
  qrcodeRouteN(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['orderId'],
      this.tBody[index]['aluminumLength'], this.tBody[index]['targetList'],
      this.tBody[index]['aluminumCode'], false]);
  }
  qrcodeRouteNT(index) {
    console.log(this.tBody[index]);
    this.router.navigate(['qrcode', false, false, this.tBody[index]['orderId'],
      this.tBody[index]['aluminumLength'], false,
      this.tBody[index]['aluminumCode'], false]);
  }
  zhuan(index) {
    this.zhuandan.emit(index);
  }
  searchProduct(contractName) {
    this.search.emit(contractName);
    this.searchStatus = true;
  }
  searchOff() {
    this.searchStatus = false;
    this.searchOf.emit(false);
  }
  selectSystem(name) {
    this.sProSystem.emit(name);
  }
}
