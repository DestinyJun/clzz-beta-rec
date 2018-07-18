import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';

@Component({
  selector: 'app-tactics-marketing',
  templateUrl: './tactics-marketing.component.html',
  styleUrls: ['./tactics-marketing.component.css'],
  animations: [slideToRight]
})
export class TacticsMarketingComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  constructor() { }

  ngOnInit() {
  }

}
