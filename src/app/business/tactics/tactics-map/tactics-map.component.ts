import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';

@Component({
  selector: 'app-tactics-map',
  templateUrl: './tactics-map.component.html',
  styleUrls: ['./tactics-map.component.css'],
  animations: [slideToRight]
})
export class TacticsMapComponent implements OnInit {
  @HostBinding('@routerAnimate') state;

  ngOnInit() {
    }
}
