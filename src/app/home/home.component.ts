import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {slideToRight} from '../remind/ts/routeAnimation';
import {leftToRight} from '../remind/ts/sidebarAnimation';
import {ToastService} from '../remind/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideToRight, leftToRight]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  State = 'in';
  @Output() InfoTg = new EventEmitter();
  @Output() sidebar = new EventEmitter();
  ToastInformation: string;
  constructor(public toastIfo: ToastService) {
  }

  ToastInfo(event) {
    this.ToastInformation = event;
  }
  infoTg() {
    this.InfoTg.emit(true);
  }
  ngOnInit() {
    setInterval(() => this.wi(), 1000);
  }
  ToggleState() {
    this.State = this.State === 'in' ?  'out' : 'in';
    console.log(this.State);
  }
  wi() {
    if (window.innerWidth > 768) {
      this.State = 'in';
    }
  }
  SideBar() {
    console.log('home');
    if (window.innerWidth < 768) {
      this.ToggleState();
    }
    this.sidebar.emit(22);
  }

}
