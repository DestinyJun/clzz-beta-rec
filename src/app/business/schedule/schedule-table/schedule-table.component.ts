import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../../based/page.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {


  @Input() tHead: Array<string>; // 表格头部列式信息
  @Input() fontSize: number; // 字体大小
  @Input() prop: Array<string>; // 类的成员信息排列
  @Input() tBody: Array<object>[]; // 表格主体数据
  @Input() title: string; // 表格标题
  @Input() btnGroup: Array<string> = []; // 按钮组
  @Output() index = new EventEmitter();
  @Input() page: PageService;
  @Input() btn: true;
  @Input() status: string;
  @Output() formName = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() down = new EventEmitter();
  @Output() searchOrder = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  chineseStatus(status: number) {
    if (this.status === '调排') {
      switch (status) {
        case 1: return '准备生产';
        case 2: return '正在生产....';
        case 3: return '生产停机';
      }
    }
  }
  downOrder(index) {
    this.down.emit(index);
  }
  addOrder() {
    this.formName.emit('order');
  }
  deleteOrder(index) {
    this.delete.emit(index);
  }
  sendIndex(index) {
    this.index.emit(index);
  }
  search(name) {
    if (name !== '') {
      this.searchOrder.emit(name);
    }
  }
}

