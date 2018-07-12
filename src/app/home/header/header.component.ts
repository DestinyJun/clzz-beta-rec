import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HomeService} from '../home.service';
import {getTime} from 'ngx-bootstrap/chronos/utils/date-getters';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../../remind/login-id.service';
import {progressbar} from './progressbar-animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidebar = new EventEmitter<Boolean>();
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
  public scrollToggle: boolean;
  public navListToggle: boolean;
  long = '_0%';
  constructor(private homeService: HomeService, private route: Router, private http: HttpClient, private Id: LoginIdService) {
    this.infoToggle = true;
    this.scrollToggle = true;
    this.navListToggle = true;
  }
  ngOnInit() {}
  public Sidebar() {
    console.log('header');
    this.sidebar.emit(true);
  }
  public onScrollToggle(event): void {
    if (event.target.innerText === '关闭') {
      this.scrollToggle = true;
      return;
    }
      this.scrollToggle = !this.scrollToggle;
  }
  loginOut() {
    const sid = { sid: this.Id.get('userId') };
    console.log(sid);
    this.http.post('http://120.78.137.182/element-admin/user/logout', sid)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.Id.remove('userId');
        }
      });
    this.route.navigate(['/login']);
  }
  public onToggleInfo(): void {
      this.infoToggle = !this.infoToggle;
  }
  public getDateDiff (nowTime: Date, endTime: Date): any {
    const t1 = new Date(nowTime).getTime();
    const t2 = new Date(endTime).getTime();
    const diffTime =  t1 - t2 ;
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
  longState() {
    this.long = '_80%';
  }
}
