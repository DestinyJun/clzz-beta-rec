import {Component, EventEmitter, HostBinding, OnInit, Output, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {LoginIdService} from '../../../login/login-id.service';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import {ScheduleHttpService} from '../schedule-http.service';
import {slideToRight} from '../../../routeAnimation';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css'],
  animations: [slideToRight]
})
export class OrderEntryComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  modalRef: BsModalRef;
  order: FormGroup;

  ftype: string;
  fccd: string;
  ptype: string;
  btype: string;
  pro_system: string;
  figura: string;
  doublecloat: string;
  submitter = '未知';

  @Output() submit = new EventEmitter();
  constructor(private http: ScheduleHttpService, private modalService: BsModalService,
              private user: LoginIdService, private fb: FormBuilder) {
    this.order = this.fb.group({
      Area: [0, Validators.required],
      price: [0, Validators.required],
      amount: [0, Validators.required],
      contractname: ['', Validators.required],
      cname: ['', Validators.required],
      Althickness: ['', Validators.required],
      Alwidth: ['', Validators.required],
      Altype: ['', Validators.required],
      fprogram: ['', Validators.required],
      pprogram: ['', Validators.required],
      bprogram: ['', Validators.required],
      fthickness: ['', Validators.required],
      pthickness: ['', Validators.required],
      pccd: ['', Validators.required],
      bchickness: ['', Validators.required],
      bccd: ['', Validators.required],
      country: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      exdelitime: ['', Validators.required],
      exshiptime: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      deviation: ['', Validators.required],
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
  }
  Submit() {
    this.order.patchValue({'Allength': this.order.get('Area').value / this.order.get('Alwidth').value});
    const body = {
      cname: this.order.get('cname').value,
      contractname: this.order.get('contractname').value,
      tel: this.order.get('tel').value,
      Altype: this.order.get('Altype').value,
      Allength: this.order.get('Area').value / this.order.get('Alwidth').value,
      Alwidth: this.order.get('Alwidth').value,
      Althickness: this.order.get('Althickness').value ,
      fthickness: this.order.get('fthickness').value,
      ftype: this.ftype,
      fprogram: this.order.get('fprogram').value,
      fccd: this.fccd,
      pthickness: this.order.get('pthickness').value,
      ptype: this.ptype,
      pprogram: this.order.get('pprogram').value,
      pccd: this.order.get('pccd').value,
      doublecloat: this.doublecloat === '是' ? 1 : 0,
      figura: this.figura === '有花纹' ? 1 : 0,
      bchickness: this.order.get('bchickness').value,
      btype: this.btype,
      bprogram: this.order.get('bprogram').value,
      bccd: this.order.get('bccd').value,
      address: this.order.get('address').value,
      submitter: this.user.getObject('user').realName,
      exdelitime: this.order.get('exdelitime').value,
      exshiptime: this.order.get('exshiptime').value,
      pro_system: this.pro_system,
      country: this.order.get('country').value,
      province: this.order.get('province').value,
      city: this.order.get('city').value,
      price: this.order.get('price').value,
      deviation: this.order.get('deviation').value,
      amount: this.order.get('amount').value,
      };
    console.log(body);
    this.http.AddOrders(body)
      .subscribe(data => {console.log(data);
      this.submit.emit(true);
      });
  }




}
