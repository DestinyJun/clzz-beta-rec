import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../../shared/http.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.directive';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public eventType: string;
  public event: Observable<any>;
  public Modal1: Array<any>;
  public Modal2: any;
  modalRef: BsModalRef;
  constructor(private http: HttpService, private modalService: BsModalService ) {
  }

  ngOnInit() {
    this.event = this.http.getEvent();
    this.event.subscribe(data => {
      this.Modal1 = data['values'];
    });
  }
  EventT(value) {
    this.eventType = value;
  }
  openModal(template: TemplateRef<any>, value) {
    this.Modal2 = value;
    console.log(template);
    this.modalRef = this.modalService.show(template);
  }
}

