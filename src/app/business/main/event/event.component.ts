import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../../shared/http.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public color= [
    'rgba(32, 158, 145, 0.5)', 'rgba(144, 185, 0, 0.5)', 'rgba(223, 184, 28, 0.5)', 'rgba(232, 86, 86, 0.5)', 'rgba(45, 172, 209, 0.5)'
  ];
  public event: Observable<any>;
  public Modal1: Array<any>;
  public Modal2: any;
  constructor(private http: HttpService) {


  }

  ngOnInit() {
    this.Modal2 = {'target_id': '', 'event_type': '', 'event_name': '', 'event_attachment': '', 'event_date': ''};
    this.event = this.http.getEvent();
    this.event.subscribe(data => {
      console.log(data);
      this.Modal1 = data['values'];
      console.log(this.Modal1);
    });
  }
  Modal(list) {
   this.Modal2 = list;
  }
  BgColor(type) {
    let bgColor = '';
    switch (type) {
      case 4: bgColor = this.color[4]; break;
      case 3: bgColor = this.color[3]; break;
      case 2: bgColor = this.color[2]; break;
      case 1: bgColor = this.color[1]; break;
      case 0: bgColor = this.color[0]; break;
    }
    return bgColor;
  }

}

