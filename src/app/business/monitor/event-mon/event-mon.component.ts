import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpService} from '../../../based/http.service';
import {ActivatedRoute} from '@angular/router';
import {PageBetaService} from '../../../based/page-beta.service';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css']
})

export class EventMonComponent implements OnInit {

  eventInfo: Array<EventInfo> = [];
  row = 15;
  prop: Array<string> = ['event_id', 'event_type', 'pro_system', 'event_name', 'event_date', 'event_attachment'];
  tHead: Array<string> = ['#', 'ID', '事件类型', '所在生产线', '事件简述', '发生时间', '附件'];
  constructor(private http: HttpService, public pageService: PageBetaService, private activatedRoute: ActivatedRoute) {
    this.pageService.setUrl('/home/monitor/event');
    this.activatedRoute.params.subscribe(() => {
      this.pageService.setPageNo(this.activatedRoute.snapshot.params['nowPage']);
      this.getData();
    });
  }
  ngOnInit() {
  }

  getData() {
    this.http.getEvent(this.pageService.getPageNo(), this.row).subscribe(data => {
      console.log(data);
      this.eventInfo = data['values']['contents'];
      this.pageService.setPageNo(data['values']['totalPage']);
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

