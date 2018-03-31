import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-department-button',
  templateUrl: './department-button.component.html',
  styleUrls: ['./department-button.component.css']
})
export class DepartmentButtonComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.post('http://120.78.137.182/element-admin/department/tree', '')
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
