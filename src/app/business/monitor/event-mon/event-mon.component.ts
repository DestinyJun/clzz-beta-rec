import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpService} from '../../../shared/http.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css'],
  animations: [slideToRight]
})

export class EventMonComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  public event = [];
  constructor(private http: HttpService) {
    this.http.getEvent().subscribe(data => {console.log(data); this.event = data['values']; });
  }
  ngOnInit() {}

}


