import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpService} from '../../../based/http.service';
import {slideToRight} from '../../../routeAnimation';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css']
})

export class EventMonComponent implements OnInit {

  eventInfo: Array<EventInfo> = [];
  row: number;
  prop: Array<string> = ['event_id', 'event_type', 'pro_system', 'event_name', 'event_date', 'event_attachment'];
  tHead: Array<string> = ['#', 'ID', '事件类型', '所在生产线', '事件简述', '发生时间', '附件'];
  constructor(private http: HttpService, public pageService: PageService, private activatedRoute: ActivatedRoute) {
    this.row = 1;
    this.pageService.setUrl('/home/monitor/event');
    this.activatedRoute.params.subscribe(() => {
      this.pageService.setNowPage(this.activatedRoute.snapshot.params['nowPage']);
      this.getData();
    });
  }
  ngOnInit() {
  }

  getData() {
    this.http.getEvent(this.pageService.getNowPage(), this.row).subscribe(data => {
      console.log(data);
      this.eventInfo = data['values']['datas'];
      const number = data['values']['number'];
      this.pageService.setPage(number, this.row);
    });
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

