import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [slideToRight]
})
export class VideoComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  public siders: any;
  constructor() {
    this.siders = [{
      pingtai: '平台',
      key: [
        {
          zong1: '总1',
          key: [
            {
              feng1: '分1',
              key: [
                {shengchanxian: '生产线1', key: [{name: '摄像头1', url: ''}, {name: '摄像头2', url: ''}, {name: '摄像头3', url: ''}]}
                ]
            }
            ]
        }]
    }];

  }

  ngOnInit() {
  }

}
