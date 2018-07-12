import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  camera: Array<Camera> = [];
  constructor(private http: HttpClient) {
    this.QueryCameraNumber({
      gid: 1,
      page: 1,
      row: 1
    });
  }

  ngOnInit() {
  }

  parameterSerialization(obj: object): string {
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
  QueryCameraNumber(obj) {
    const body = this.parameterSerialization(obj);
    this.http.post('http://120.78.137.182/element/QueryCamera', body, {
      headers: this.headers
    }).subscribe(data => {
      console.log(data);
      this.QueryCamera({
        gid: 1,
        page: 1,
        row: data['number']
      });
    });
  }
  QueryCamera(obj) {
    const body = this.parameterSerialization(obj);
    this.http.post('http://120.78.137.182/element/QueryCamera', body, {
      headers: this.headers
    }).subscribe(data => {
      this.camera = data['datas'];
      console.log(this.camera);
    });
  }
}
class Camera {
  id: string;
  name: string;
  date: string;
  creator: string;
  inner_url: string;
  outer_url: string;
  status: 0;
  p_id: null;
  page: 0;
  row: 0;
  g_id: string;
  place: string;
}
