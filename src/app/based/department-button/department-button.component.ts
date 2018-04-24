import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InfoStatusService} from '../../remind/info-status.service';

@Component({
  selector: 'app-department-button',
  templateUrl: './department-button.component.html',
  styleUrls: ['./department-button.component.css']
})
export class DepartmentButtonComponent implements OnInit {

  organizations: Array<object>;
  one: Array<object>;
  two: Array<object>;
  three: Array<object>;
  system: Array<object>;
  constructor(private http: HttpClient, private department: InfoStatusService) {
    this.http.post('http://120.78.137.182/element-admin/department/tree', '')
      .subscribe(data => {
        console.log(data);
      });
    this.http.post('http://120.78.137.182/element/SeeAdministration', '', {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
    }).subscribe(data => {
      console.log(data);
      this.system = data['system'];
      console.log(this.system);
    })
  }

  ngOnInit() {
  }

}
