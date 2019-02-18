import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../../login/login-id.service';
import {Url} from '../../getUrl';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  url = new Url().getUrl();
  userInfo = new Info();
  constructor(private http: HttpClient, private user: LoginIdService) { }

  ngOnInit() {
    this.querySelf();
  }

  public querySelf() {
    const body = {sid: JSON.parse(this.user.get('user'))['sid']};
    console.log(body);
    return this.http.post('http://' + this.url + '/element-admin/user/query-self', body)
      .subscribe(data => {
        console.log(data);
        this.userInfo = data['data'];
      });
  }
  public updateSelf() {
    const body = this.userInfo;
    console.log(body);
    return this.http.post('http://' + this.url + '/element-admin/user/update-self', body)
      .subscribe(data => {
        console.log(data);
      });
  }
}
class Info {
  birthday: string;
  email: string;
  gender: string;
  homeAddress: string;
  homeTelephone: string;
  id: string;
  idCode: string;
  idt: string;
  organizationId: string;
  password: string;
  phone: string;
  realName: string;
  sysids: string;
  udt: string;
  userCode: string;
  userName: string;
}
