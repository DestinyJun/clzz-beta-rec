import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeService, NavList, NavListChild} from '../home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public navLists: NavList[] = [
    new NavList('首页', 'fa fa-home', true, [] , true),
    new NavList('生产监视', 'fa fa-home', false, [
      new NavListChild('感知数据即时监视', false),
      new NavListChild('视频数据即时监视', false),
      new NavListChild('事件数据监视', false),
      new NavListChild('温度数据即时监视', false),
      new NavListChild('厚度数据即时监视', false),
      new NavListChild('生产一键运行', false)
    ] , true),
    new NavList('设备运行', 'fa fa-home', false, [
      new NavListChild('感知历史数据', false),
      new NavListChild('设备信息', false),
      new NavListChild('设备更换', false),
    ] , true),
    new NavList('生产排程', 'fa fa-home', false, [
      new NavListChild('营销订单录入', false),
      new NavListChild('订单查询', false),
      new NavListChild('营销订单审核', false),
      new NavListChild('生产工艺审核', false),
    ] , true),
    new NavList('原材料管理', 'fa fa-home', false, [
      new NavListChild('原材料录入', false),
      new NavListChild('原材料审核', false),
      new NavListChild('原材料信息', false)
    ] , true),
    new NavList('成品管理', 'fa fa-home', false, [
      new NavListChild('成品入库', false),
      new NavListChild('成品出库监控', false),
    ] , true),
    new NavList('策略分析', 'fa fa-home', false, [
      new NavListChild('地图策略分析', false),
      new NavListChild('订单策略分析', false),
      new NavListChild('营销策略分析', false),
    ] , true)
  ];
  public classname = ['glyphicon-home', 'glyphicon-cog', 'glyphicon-signal', 'glyphicon-credit-card', 'glyphicon-edit',
    'glyphicon-th', 'glyphicon-map-marker', 'glyphicon-file', 'glyphicon-option-horizontal'];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  PathContent: string;
  mainli: any;
  constructor(private homeService: HomeService, private router: Router) {
    this.slidinghight = 0;
    this.slidingTop = -120;
    this.difulHeight = 0;
    this.pathContentBrush();
  }
  ngOnInit() {}
  pathContentClick(list) {
    this.PathContent = list;
  }
  pathContentBrush() {
    const url = this.router.url;
    if ( url === '/main/marketing-order-entry') {
      this.PathContent = '原材料录入';
    } else if (url === '/main/modular') {
      this.PathContent = '感知数据即时监视';
    } else if (url === '/main/ymain') {
      this.PathContent = '';
    } else if (url === '/main/camera') {
      this.PathContent = '视频数据即时监视';
    } else if (url === '/main/event-data') {
      this.PathContent = '事件数据监视';
    } else if (url === '/main/temperature') {
      this.PathContent = '温度数据即时监视';
    } else if (url === '/main/diagram') {
      this.PathContent = '厚度数据即时监视';
    } else if (url === '/main/device') {
      this.PathContent = '感知历史数据';
    } else if (url === '/main/deviceInformation') {
      this.PathContent = '设备信息';
    } else if (url === '/main/order-audit') {
      this.PathContent = '营销订单审核';
    } else if (url === '/main/order-query') {
      this.PathContent = '订单查询';
    } else if (url === '/main/order-technology-audit') {
      this.PathContent = '生产工艺审核';
    } else if (url === '/main/item') {
      this.PathContent = '营销订单录入';
    } else if (url === '/main/raw-material-audit') {
      this.PathContent = '原材料审核';
    } else if (url === '/main/order-information') {
      this.PathContent = '成品入库';
    } else if (url === '/main/cityMap') {
      this.PathContent = '地图策略分析';
    } else if (url === '/main/orderMap') {
      this.PathContent = '订单策略分析';
    } else if (url === '/main/pass-raw-detail') {
      this.PathContent = '原材料信息';
    } else {
      this.PathContent = '首页';
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
    console.log(mainul, element, list);
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
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
  ToMain(R) {
    if (R === '首页') {
      this.router.navigate(['/main']);
      this.PathContent = '';
    }
  }
  ToRoute(listChild) {
    if (listChild === '原材料录入') {
      this.router.navigate(['/main/marketing-order-entry']);
    } else if (listChild === '感知数据即时监视') {
      this.router.navigate(['app/home/monitor/sensor']);
    } else if (listChild === '视频数据即时监视') {
      this.router.navigate(['/main/camera']);
    } else if (listChild === '事件数据监视') {
      this.router.navigate(['/main/event-data']);
    } else if (listChild === '温度数据即时监视') {
      this.router.navigate(['/main/temperature']);
    } else if (listChild === '厚度数据即时监视') {
      this.router.navigate(['/main/diagram']);
    } else if (listChild === '感知历史数据') {
      this.router.navigate(['/main/device']);
    } else if (listChild === '设备信息') {
      this.router.navigate(['/main/deviceInformation']);
    } else if (listChild === '营销订单审核') {
      this.router.navigate(['/main/order-audit']);
    } else if (listChild === '订单查询') {
      this.router.navigate(['/main/order-query']);
    } else if (listChild === '生产工艺审核') {
      this.router.navigate(['/main/order-technology-audit']);
    } else if (listChild === '营销订单录入') {
      this.router.navigate(['/main/item']);
    } else if (listChild === '原材料审核') {
      this.router.navigate(['/main/raw-material-audit']);
    } else if (listChild === '成品入库') {
      this.router.navigate(['/main/order-information']);
    } else if (listChild === '地图策略分析') {
      this.router.navigate(['/main/cityMap']);
    } else if (listChild === '订单策略分析') {
      this.router.navigate(['/main/orderMap']);
    } else if (listChild === '原材料信息') {
      this.router.navigate(['/main/pass-raw-detail']);
    } else {
      this.router.navigate(['/main/notFound']);
    }
  }
}
