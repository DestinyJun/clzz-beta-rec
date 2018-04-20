import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HomeService} from '../home.service';
import {getTime} from 'ngx-bootstrap/chronos/utils/date-getters';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../../remind/login-id.service';
import {HttpService} from '../../shared/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() infoToggle: boolean;
  @Input() infoTg: boolean;
  @ViewChild('userRemindScrollContent')
  userRemindScrollContent: ElementRef; // 大盒子
  @ViewChild('scrollBox')
  scrollBox: ElementRef; // 滚动盒子
  @ViewChild('scrollBoxBar')
  scrollBoxBar: ElementRef; // 滚动条
  @ViewChild('scrollListGroup')
  scrollListGroup: ElementRef; // 内容盒子
  public remindTxt: string;
  public scrollToggle: boolean;
  public navListToggle: boolean;
  public userReminds: UserRemind[];
  public userRemindsChange: any;
  public bigBoxHeight: number;
  public contentBoxHeight: number;
  public scrollBarHeight: number;
  public barBoxHeight: string;
  constructor(private req: HttpService , private homeService: HomeService, private route: Router, private http: HttpClient, private Id: LoginIdService) {
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
    this.req.addEvent.subscribe(
      data => {
        this.remindTxt = data;
        this.scrollToggle = false;
        setTimeout(() => {
          this.scrollToggle = true;
        }, 3000);
      }
    );
  }
  ngAfterViewInit(): void {
    let t: number;
    this.bigBoxHeight = this.userRemindScrollContent.nativeElement.offsetHeight;
    this.contentBoxHeight = this.scrollListGroup.nativeElement.offsetHeight;
    t =  this.bigBoxHeight / this.contentBoxHeight * this.bigBoxHeight;
    this.barBoxHeight = t.toString() + 'px';
  }
  public onNavListToggle(): void  {}
  public onScrollToggle(event): void {
    if (event.target.innerText === '关闭') {
      this.scrollToggle = true;
      return;
    }
      this.scrollToggle = !this.scrollToggle;
  }
  loginOut() {
    const sid = '{ "sid":"' + this.Id.get('user') + '"}';
    console.log(sid);
    this.http.post('http://120.78.137.182/element-admin/user/logout', sid)
      .subscribe(data => {
        this.route.navigate(['/login']);
      });
  }
  public onToggleInfo(event: any): void {
      this.infoToggle = !this.infoToggle;
  }
  public onLeaveToggle(event: any): void {
    this.infoToggle = true;
  }
  public getDateDiff (nowTime: Date, endTime: Date): any {
    let t1 = new Date(nowTime).getTime();
    let t2 = new Date(endTime).getTime();
    let diffTime =  t1 - t2 ;
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
