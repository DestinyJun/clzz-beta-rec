import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../shared/http.service';
@Component({
  selector: 'app-event-mon',
  templateUrl: './event-mon.component.html',
  styleUrls: ['./event-mon.component.css']
})

export class EventMonComponent implements OnInit {

  public event = [];
  constructor(private http: HttpService) {
    this.http.getEvent().subscribe(data => {console.log(data); this.event = data['values']; });
  }
  ngOnInit() {}

}


