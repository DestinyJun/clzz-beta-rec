import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public siders: Array<object>;
  constructor() {
    this.siders =

  }

  ngOnInit() {
  }
  f(i) {
    console.log(i);
  }

}
