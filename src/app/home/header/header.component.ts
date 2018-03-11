import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public infoToggle: boolean;
  public scrollToggle: boolean;
  public navListToggle: boolean;
  public userReminds: UserRemind[];
  public userRemindsChange: any;
  public numbers: Array<number> = [4, 9, 16, 25];
  constructor(private homeService: HomeService) {
    this.infoToggle = true;
    this.scrollToggle = true;
    this.navListToggle = true;
    this.userReminds = [
      new UserRemind('故障！', '../../../assets/images/Nasta.png', '一号仓库电机组出现故障', '2018/03/11 19:30:22'),
      new UserRemind('操作：', '../../../assets/images/Nasta.png', '生产订单添加成功', '2018/03/11 20:03:11'),
      new UserRemind('警告！：', '../../../assets/images/Nasta.png', '油漆数量不足', '2018/03/11 20:11:35')
    ];

    this.userRemindsChange = this.userReminds.map((n, index, obj) => {
      n.userTime = this.getDateDiff(new Date(), n.userTime);
    });
    console.log(this.userRemindsChange);
  }

  ngOnInit() {
  }
  public onToggleInfo(): void {
    this.infoToggle = !this.infoToggle;
  }
  public onScrollToggle(): void {
    this.scrollToggle = !this.scrollToggle;
  }
  public onNavListToggle(): void  {}
  public getDateDiff (nowTime: any, startTime: any): any {
    let diffTime: any = new Date(nowTime) - new Date(startTime);
    let hour = '';
    let minute = '';
    if (((diffTime / 1000) / 60) / 60 > 1) {
      hour = (((diffTime / 1000) / 60) / 60).toFixed().toString();
      return hour + '小时前';
    } else if ((diffTime / 1000) / 60 > 1 ) {
      minute = ((diffTime / 1000) / 60).toFixed().toString();
      return minute + '分钟前';
    } else {
      return '小于一分钟前';
    }
  }

}
export class UserRemind {
  constructor(
    public classFlag: string,
    public userPhoto: string,
    public userMessage: string,
    public userTime: string
  ) {}
}
