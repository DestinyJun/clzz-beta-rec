import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeService, NavList, NavListChild} from '../home.service';
import {PositionNameService} from '../../remind/position-name.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public navLists: NavList[] = [
    new NavList('首页', 'fa fa-university', true, [] , true),
    new NavList('生产监视', 'fa fa-laptop', false, [
      new NavListChild('感知数据即时监视', false, 'monitor/sensor'),
      new NavListChild('视频数据即时监视', false, 'monitor/video'),
      new NavListChild('事件数据监视', false, 'monitor/event'),
      new NavListChild('温度数据即时监视', false, 'monitor/temperature'),
      new NavListChild('厚度数据即时监视', false, 'monitor/thickness')
    ] , true),
    new NavList('设备运行', 'fa fa-th-large', false, [
      new NavListChild('感知历史数据', false, 'equipment/devhis'),
      new NavListChild('设备信息', false, 'equipment/devnew'),
    ] , true),
    new NavList('生产排程', 'fa fa-outdent', false, [
      new NavListChild('订单查询', false, 'schedule/ordque'),
      new NavListChild('营销订单审核', false, 'schedule/ordmar'),
      new NavListChild('生产工艺审核', false, 'schedule/ordcra'),
      new NavListChild('任务调排', false, 'schedule/ordadj'),
    ] , true),
    new NavList('原材料管理', 'fa fa-sitemap', false, [
      new NavListChild('原材料查询', false, 'material/matche/1/0/1/1'),
      new NavListChild('原材料审核', false, 'material/matmes/0/1/1/-1')
    ] , true),
    new NavList('成品管理', 'fa fa-hdd-o', false, [
      new NavListChild('待入库成品', false, 'product/proenting'),
      new NavListChild('已入库成品', false, 'product/procent'),
      new NavListChild('已出库成品', false, 'product/procout'),
    ] , true),
    new NavList('策略分析', 'fa fa-graduation-cap', false, [
      new NavListChild('地图策略分析', false, 'tactics/tacmap'),
      new NavListChild('订单策略分析', false, 'tactics/tacord'),
      new NavListChild('营销策略分析', false, 'tactics/tacmark'),
    ] , true)
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(private router: Router, private homeService: HomeService, private Name: PositionNameService) {
    this.slidinghight = 0;
    this.slidingTop = -120;
    this.difulHeight = 0;
  }
  ngOnInit() {}
  PullName(name, event) {
    event.stopPropagation();
    this.Name.set('positionName', name);
  }
  PullMain(name) {
    if (name === '首页') {
      this.Name.set('positionName', name);
    }
  }
  onMouseleave() {
    this.slidingTop = -120;
  }
  mainLiMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  mainLiClick(mainul, element, list) {
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
      this.router.navigate(['/home']);
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      this.navLists.forEach((item) => {
        item.open = true;
        item.clsstate = false;
        item.children.forEach((itemchild) => {
          itemchild.setState = false;
        });
      });
      list.clsstate = true;
      return;
    }
    if (element.offsetHeight === 0) {
      this.navLists.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 40;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    }else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }

  }
  menuliMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  menuliClick(element) {
    this.navLists.forEach((item) => {
      item.clsstate = false;
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    element.setState = true;
  }
}
