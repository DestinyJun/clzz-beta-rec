import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css']
})

export class EventMonComponent implements OnInit {

  j: number;
  eventDatas: EventDataMonitoring[] = [
    new EventDataMonitoring('001', '报警', '2018-2-16 12:00:00', '1号传感器报警', '视频', '出问题'),
    new EventDataMonitoring('002', '人工操作', '2018-2-1 12:00:00', '2号传感器报警', '图片', '出问题'),
    new EventDataMonitoring('003', '感知层事件', '2018-2-23 12:00:00', '2号传感器报警', '视频', '出问题'),
    new EventDataMonitoring('004', '报警', '2018-2-21 12:00:00', '1号传感器报警', '视频', '出问题'),
    new EventDataMonitoring('005', '人工操作', '2018-2-2 12:00:00', '3号传感器报警', '图片', '出问题'),
  ];
  constructor() {}
  ngOnInit() {}
  eventDataDetail(i) {
    this.j = i;
    return this.j;
  }
}
export class EventDataMonitoring {
  constructor(
    public eventNum: string,
    public eventType: string,
    public happenTime: string,
    public eventName: string,
    public attachment: string,
    public eventDesc: string
  ) {}
}


