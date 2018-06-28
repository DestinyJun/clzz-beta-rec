import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../remind/ts/routeAnimation';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
  animations: [slideToRight]
})
export class MonitorComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  constructor() { }

  ngOnInit() {
  }

}
