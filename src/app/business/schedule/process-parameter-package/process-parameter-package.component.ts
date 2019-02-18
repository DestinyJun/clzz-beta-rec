import {Component, Input, OnInit} from '@angular/core';
import {modalName, modalProp, objectName} from './parameter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../getUrl';

@Component({
  selector: 'app-process-parameter-package',
  templateUrl: './process-parameter-package.component.html',
  styleUrls: ['./process-parameter-package.component.css']
})
export class ProcessParameterPackageComponent implements OnInit {

  modalProp = modalProp;
  modalName = modalName;
  objectName = objectName;
  process: FormGroup;
  url = new Url().getUrl();
  modify = false;
  processObject: object;
  @Input() oid: string;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.process = this.formBuilder.group({
      data_pack_time: [{value: null, disabled: true}],
      plate_thickness: [{value: null, disabled: true}],
      plate_width: [{value: null, disabled: true}],
      plate_length: [{value: null, disabled: true}],
      bottom_dry_thickness: [''],
      bottom_dry_thickness_d: ['', Validators.required],
      bottom_dry_thickness_d_l: [{value: null, disabled: true}],
      bottom_dry_thickness_d_r: [{value: null, disabled: true}],
      bottom_wet_thickness: ['', Validators.required],
      bottom_wet_thickness_d: ['', Validators.required],
      bottom_wet_thickness_d_l: [{value: null, disabled: true}],
      bottom_wet_thickness_d_r: [{value: null, disabled: true}],
      back_dry_thickness: ['', Validators.required],
      back_dry_thickness_d: ['', Validators.required],
      back_dry_thickness_d_l: [{value: null, disabled: true}],
      back_dry_thickness_d_r: [{value: null, disabled: true}],
      back_wet_thickness: ['', Validators.required],
      back_wet_thickness_d: ['', Validators.required],
      back_wet_thickness_d_l: [{value: null, disabled: true}],
      back_wet_thickness_d_r: [{value: null, disabled: true}],
      surface_dry_thickness: ['', Validators.required],
      surface_dry_thickness_d: ['', Validators.required],
      surface_dry_thickness_d_l: [{value: null, disabled: true}],
      surface_dry_thickness_d_r: [{value: null, disabled: true}],
      surface_wet_thickness: ['', Validators.required],
      surface_wet_thickness_d: ['', Validators.required],
      surface_wet_thickness_d_l: [{value: null, disabled: true}],
      surface_wet_thickness_d_r: [{value: null, disabled: true}],
      temperature_1_1: [{value: null, disabled: true}],
      temperature_1_1_d: [{value: null, disabled: true}],
      temperature_1_2: [{value: null, disabled: true}],
      temperature_1_2_d: [{value: null, disabled: true}],
      temperature_1_3: [{value: null, disabled: true}],
      temperature_1_3_d: [{value: null, disabled: true}],
      temperature_1_4: [{value: null, disabled: true}],
      temperature_1_4_d: [{value: null, disabled: true}],
      temperature_1_5: [{value: null, disabled: true}],
      temperature_1_5_d: [{value: null, disabled: true}],
      temperature_2_1: [{value: null, disabled: true}],
      temperature_2_1_d: [{value: null, disabled: true}],
      temperature_2_2: [{value: null, disabled: true}],
      temperature_2_2_d: [{value: null, disabled: true}],
      temperature_2_3: [{value: null, disabled: true}],
      temperature_2_3_d: [{value: null, disabled: true}],
      temperature_2_4: [{value: null, disabled: true}],
      temperature_2_4_d: [{value: null, disabled: true}],
      temperature_2_5: [{value: null, disabled: true}],
      temperature_2_5_d: [{value: null, disabled: true}],
      exhaust_air_volume_1: [{value: null, disabled: true}],
      exhaust_air_volume_1_d: [{value: null, disabled: true}],
      exhaust_air_volume_2: [{value: null, disabled: true}],
      exhaust_air_volume_2_d: [{value: null, disabled: true}],
      order_id: ['']
    });
  }

  ngOnInit() {
    console.log(this.process);
  }

  initProcess() {
    const body = {order_id: this.oid};
    console.log(body);
    this.http.post('http://' + this.url + '/element-admin/technics/product-data-query', body).subscribe(data => {
      console.log(data);
      this.process.patchValue(data['data']);
      this.processObject = data['data'];
    });
  }
  modifyProcess() {
    const body: object = this.processObject;
    body['order_id'] = this.oid;
    for (let i = 0; i < this.objectName.length; i++) {
      body[this.objectName[i]] = this.process.value[this.objectName[i]];
    }
    this.http.post('http://' + this.url + '/element-admin/technics/product-data-alert', body).subscribe(data => {
      console.log(data);
    });
  }
}
