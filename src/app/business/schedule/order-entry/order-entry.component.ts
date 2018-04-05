import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {LoginIdService} from '../../../remind/login-id.service';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent implements OnInit {

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
  constructor(private http: HttpClient, private modalService: BsModalService, private user: LoginIdService, private fb: FormBuilder) {
    this.order = this.fb.group({
      Area: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      Allength: ['', Validators.required],
      oid: ['', Validators.required],
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
      address: ['', Validators.required]
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
  }
  Submit() {
    this.order.patchValue({'Allength': this.order.get('Area').value / this.order.get('Alwidth').value});
    const body = ' {\n' +
      '\t"cname":"' + this.order.get('cname').value + '",\n' +
      '\t"contractname":"' + this.order.get('contractname').value + '",\n' +
      '\t"tel":"' + this.order.get('tel').value + '",\n' +
      '\t"Altype":"' + this.order.get('Altype').value + '",\n' +
      '\t"Allength":"' + this.order.get('Area').value / this.order.get('Alwidth').value + '",\n' +
      '\t"Alwidth":"' + this.order.get('Alwidth').value + '",\n' +
      '\t"Althickness":"' + this.order.get('Althickness').value + '",\n' +
      '\t"fthickness":"' + this.order.get('fthickness').value + '",\n' +
      '\t"ftype":"' + this.ftype + '",\n' +
      '\t"fprogram":"' + this.order.get('fprogram').value + '",\n' +
      '\t"fccd":"' + this.fccd + '",\n' +
      '\t"pthickness":"' + this.order.get('pthickness').value + '",\n' +
      '\t"ptype":"' + this.ptype + '",\n' +
      '\t"pprogram":"' + this.order.get('pprogram').value + '",\n' +
      '\t"pccd":"' + this.order.get('pccd').value + '",\n' +
      '\t"doublecloat":"' + this.doublecloat + '",\n' +
      '\t"figura":"' + 1 + '",\n' +
      '\t"bchickness":"' + this.order.get('bchickness').value + '",\n' +
      '\t"btype":"' + this.btype + '",\n' +
      '\t"bprogram":"' + this.order.get('bprogram').value + '",\n' +
      '\t"bccd":"' + this.order.get('bccd').value + '",\n' +
      '\t"address":"' + this.order.get('address').value + '",\n' +
      '\t"submitter":"' + this.user.get('submitter') + '",\n' +
      '\t"exdelitime":"' + this.order.get('exdelitime').value + '",\n' +
      '\t"exshiptime":"' + this.order.get('exshiptime').value + '",\n' +
      '\t"pro_system":"' + this.pro_system + '",\n' +
      '\t"country":"' + this.order.get('country').value + '",\n' +
      '\t"province":"' + this.order.get('province').value + '",\n' +
      '\t"city":"' + this.order.get('city').value + '",\n' +
      '\t"price":"' + this.order.get('price').value + '",\n' +
      '\t"deviation":"' + 0.5 + '",\n' +
      '\t"amount":"' + this.order.get('amount').value + '"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Add-Orders', body)
      .subscribe(data => {console.log(data);
      this.submit.emit(true);
      });
  }



}
