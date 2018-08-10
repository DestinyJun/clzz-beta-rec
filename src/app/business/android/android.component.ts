import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../getUrl';

@Component({
  selector: 'app-android',
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})
export class AndroidComponent implements OnInit {

  url = new Url().getUrl();
  appInfor: Array<AppInfo>;
  constructor(private http: HttpClient) {
    this.http.post('http://' + this.url + '/element-admin/version/an-query', '')
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.appInfor = data['data'];
          console.log(this.appInfor);
        }
      });
  }

  ngOnInit() {
  }

  download(url) {
    console.log(url);
    window.open(url);
  }
}
class AppInfo {
  id: number;
  version: number;
  versionName: string;
  description: string;
  path: string;
  url: string;
  utime: string;
}
