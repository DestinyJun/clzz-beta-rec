import {Component, Input, OnInit} from '@angular/core';
import {modalName, modalProp} from './parameter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../../../getUrl';

@Component({
  selector: 'app-process-parameter-package',
  templateUrl: './process-parameter-package.component.html',
  styleUrls: ['./process-parameter-package.component.css']
})
export class ProcessParameterPackageComponent implements OnInit {

  modalProp = modalProp;
  modalName = modalName;
  process: FormGroup;
  url = new Url().getUrl();
  modify = false;
  @Input() oid: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.process = this.formBuilder.group({
      data_pack_time: ['', Validators.required],
      plate_thickness: ['', Validators.required],
      plate_width: ['', Validators.required],
      plate_length: ['', Validators.required],
      bottom_dry_thickness: ['', Validators.required],
      bottom_dry_thickness_d: ['', Validators.required],
      bottom_dry_thickness_d_l: ['', Validators.required],
      bottom_dry_thickness_d_r: ['', Validators.required],
      bottom_wet_thickness: ['', Validators.required],
      bottom_wet_thickness_d: ['', Validators.required],
      bottom_wet_thickness_d_l: ['', Validators.required],
      bottom_wet_thickness_d_r: ['', Validators.required],
      back_dry_thickness: ['', Validators.required],
      back_dry_thickness_d: ['', Validators.required],
      back_dry_thickness_d_l: ['', Validators.required],
      back_dry_thickness_d_r: ['', Validators.required],
      back_wet_thickness: ['', Validators.required],
      back_wet_thickness_d: ['', Validators.required],
      back_wet_thickness_d_l: ['', Validators.required],
      back_wet_thickness_d_r: ['', Validators.required],
      surface_dry_thickness: ['', Validators.required],
      surface_dry_thickness_d: ['', Validators.required],
      surface_dry_thickness_d_l: ['', Validators.required],
      surface_dry_thickness_d_r: ['', Validators.required],
      surface_wet_thickness: ['', Validators.required],
      surface_wet_thickness_d: ['', Validators.required],
      surface_wet_thickness_d_l: ['', Validators.required],
      surface_wet_thickness_d_r: ['', Validators.required],
      temperature_1_1: ['', Validators.required],
      temperature_1_1_d: ['', Validators.required],
      temperature_1_2: ['', Validators.required],
      temperature_1_2_d: ['', Validators.required],
      temperature_1_3: ['', Validators.required],
      temperature_1_3_d: ['', Validators.required],
      temperature_1_4: ['', Validators.required],
      temperature_1_4_d: ['', Validators.required],
      temperature_1_5: ['', Validators.required],
      temperature_1_5_d: ['', Validators.required],
      temperature_2_1: ['', Validators.required],
      temperature_2_1_d: ['', Validators.required],
      temperature_2_2: ['', Validators.required],
      temperature_2_2_d: ['', Validators.required],
      temperature_2_3: ['', Validators.required],
      temperature_2_3_d: ['', Validators.required],
      temperature_2_4: ['', Validators.required],
      temperature_2_4_d: ['', Validators.required],
      temperature_2_5: ['', Validators.required],
      temperature_2_5_d: ['', Validators.required],
      exhaust_air_volume_1: ['', Validators.required],
      exhaust_air_volume_1_d: ['', Validators.required],
      exhaust_air_volume_2: ['', Validators.required],
      exhaust_air_volume_2_d: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.process);
  }

  initProcess() {
    const body = {order_id: this.oid};
    console.log(body);
    this.http.post('http://' + this.url + '/element/see-product-pack', body).subscribe(data => {
      console.log(data);
      this.process.patchValue(data['data']);
    });
  }
  modifyProcess() {
    console.log(this.process);
    this.http.post('http://' + this.url + '/element/update-product-pack', this.process.value).subscribe(data => {
      console.log(data);
    });
  }
  private parameterSerialization(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }
}
