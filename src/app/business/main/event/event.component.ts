import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../../shared/http.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

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
  modalRef: BsModalRef;
  constructor(private http: HttpService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.Modal2 = {'target_id': '', 'event_type': '', 'event_name': '', 'event_attachment': '', 'event_date': ''};
    this.event = this.http.getEvent();
    this.event.subscribe(data => {
      this.Modal1 = data['values'];
    });
  }

  openModal(template: TemplateRef<any>, value) {
    console.log(value);
    this.modalRef = this.modalService.show(template);
  }
}

