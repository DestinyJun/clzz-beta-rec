import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpService} from '../../../based/http.service';
import {slideToRight} from '../../../routeAnimation';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css'],
  animations: [slideToRight]
})

export class EventMonComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  eventInfo: Array<EventInfo> = [];
  prop: Array<string> = ['event_id', 'event_type', 'pro_system', 'event_name', 'event_date', 'event_attachment'];
  tHead: Array<string> = ['#', 'ID', '事件类型', '所在生产线', '事件简述', '发生时间', '附件'];
  constructor(private http: HttpService) {
  }
  ngOnInit() {
    this.http.getEvent().subscribe(data => {console.log(data); this.eventInfo = data['values']['datas']; });
  }
}
class EventInfo {
  event_id: string;
  event_type: string;
  pro_system: string;
  event_name: string;
  event_date: string;
  event_attachment: string;
}

