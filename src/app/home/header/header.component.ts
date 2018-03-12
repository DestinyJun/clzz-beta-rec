import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('userRemindScroll')
   userRemindScroll: ElementRef;
  public infoToggle: boolean;
  public scrollToggle: boolean;
  public navListToggle: boolean;
  public userReminds: UserRemind[];
  public userRemindsChange: any;
  public scrollBarHeight: number;
  constructor(private homeService: HomeService) {
    this.infoToggle = true;
    this.scrollToggle = true;
    this.navListToggle = true;
    this.userReminds = [
      new UserRemind('danger', '../../../assets/images/Nasta.png', '故障！一号仓库电机组出现故障', new Date('2018/03/11 22:03:11')),
      new UserRemind('success', '../../../assets/images/Nasta.png', '操作：生产订单添加成功', new Date('2018/03/11 20:03:11')),
      new UserRemind('warning', '../../../assets/images/Nasta.png', '警告！油漆数量不足', new Date('2018/03/11 20:11:35'))
    ];
    this.userRemindsChange = this.userReminds.map((n, index, obj) => {
        n.userTime = this.getDateDiff(new Date(), n.userTime);
        return obj;
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    console.log(this.userRemindScroll);
  }
  public onNavListToggle(): void  {}
  public onScrollToggle(event): void {
    if (event.target.innerText === '关闭') {
      this.scrollToggle = true;
      return;
    }
      this.scrollToggle = !this.scrollToggle;
  }
  public onToggleInfo(event): void {
      this.infoToggle = !this.infoToggle;
  }
  public getDateDiff (nowTime: Date, startTime: Date): any {
    let diffTime = new Date(nowTime) - new Date(startTime);
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
    public userTime: Date
  ) {}
}
