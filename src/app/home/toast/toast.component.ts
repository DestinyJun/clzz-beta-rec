import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../remind/utils.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  public show;
  public content;
  public duration;
  public type;

  timer: any = null;

  constructor(private utilsService: UtilsService) {
    this.show = false;
    this.content = '21313';
    this.duration = 3000;
    this.type = 'info';
  }

  ngOnInit() {
    this.utilsService.toastChange.emit({ 'show': false,
    'content' : '21313',
    'duration': 3000,
    'type': 'info'});
    this.utilsService.toastChange.subscribe(d => {
      this.showToast(d);
    });
  }

  showToast(d) {
    clearTimeout(this.timer);
    this.content = d.content || '';
    this.duration = d.duration || this.duration;
    this.type = d.type || 'info';
    this.show = true;
    this.timer = setTimeout(() => {
      this.show = false;
    }, this.duration);
  }
}
