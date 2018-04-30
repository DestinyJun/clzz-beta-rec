import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

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
