import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {LoginIdService} from '../../../remind/login-id.service';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent implements OnInit {

  modalRef: BsModalRef;
  Area: number;
  price: number;
  amount: number;

  submitter = '未知';
  Allength: number;
  oid: string;
  contractname: string;
  cname: string;
  Althickness: number;
  Alwidth: number;
  Altype: string;
  fprogram: string;
  pprogram: string;
  bprogram: string;
  ftype: string;
  fthickness: string;
  fccd: string;
  ptype: string;
  pthickness: string;
  pccd: string;
  btype: string;
  bchickness: string;
  bccd: string;
  doublecloat: string;
  figura: string;
  pro_system: string;
  country: string;
  province: string;
  city: string;
  exdelitime: string;
  exshiptime: string;
  tel: string;
  address: string;

  @Output() submit = new EventEmitter();
  constructor(private http: HttpClient, private modalService: BsModalService, private user: LoginIdService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
  }
  Submit() {
    this.Allength = this.Area / this.Alwidth;
    const body = ' {\n' +
      '\t"cname":"' + this.cname + '",\n' +
      '\t"contractname":"' + this.contractname + '",\n' +
      '\t"tel":"' + this.tel + '",\n' +
      '\t"Altype":"' + this.Altype + '",\n' +
      '\t"Allength":"' + this.Area / this.Alwidth + '",\n' +
      '\t"Alwidth":"' + this.Alwidth + '",\n' +
      '\t"Althickness":"' + this.Althickness + '",\n' +
      '\t"fthickness":"' + this.fthickness + '",\n' +
      '\t"ftype":"' + this.ftype + '",\n' +
      '\t"fprogram":"' + this.fprogram + '",\n' +
      '\t"fccd":"' + this.fccd + '",\n' +
      '\t"pthickness":"' + this.pthickness + '",\n' +
      '\t"ptype":"' + this.ptype + '",\n' +
      '\t"pprogram":"' + this.pprogram + '",\n' +
      '\t"pccd":"' + this.pccd + '",\n' +
      '\t"doublecloat":"' + this.doublecloat + '",\n' +
      '\t"figura":"' + 1 + '",\n' +
      '\t"bchickness":"' + this.bchickness + '",\n' +
      '\t"btype":"' + this.btype + '",\n' +
      '\t"bprogram":"' + this.bprogram + '",\n' +
      '\t"bccd":"' + this.bccd + '",\n' +
      '\t"address":"' + this.address + '",\n' +
      '\t"submitter":"' + this.user.get('userName') + '",\n' +
      '\t"exdelitime":"' + this.exdelitime + '",\n' +
      '\t"exshiptime":"' + this.exshiptime + '",\n' +
      '\t"pro_system":"' + this.pro_system + '",\n' +
      '\t"country":"' + this.country + '",\n' +
      '\t"province":"' + this.province + '",\n' +
      '\t"city":"' + this.city + '",\n' +
      '\t"price":"' + this.price + '",\n' +
      '\t"deviation":"' + 0.5 + '",\n' +
      '\t"amount":"' + this.amount + '"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Add-Orders', body)
      .subscribe(data => {console.log(data);
      this.submit.emit(true);
      });
  }



}
