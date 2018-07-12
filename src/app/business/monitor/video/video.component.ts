import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../remind/ts/routeAnimation';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  animations: [slideToRight]
})
export class VideoComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  camera: Array<Camera> = [];
  camera1: Array<Camera> = [];
  camera2: Array<Camera> = [];
  camera3: Array<Camera> = [];
  camera4: Array<Camera> = [];
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
        row: data['values']['number']
      });
    });
  }
  QueryCamera(obj) {
    const body = this.parameterSerialization(obj);
    this.http.post('http://120.78.137.182/element/QueryCamera', body, {
      headers: this.headers
    }).subscribe(data => {
      this.camera = data['values']['datas'];
      const number = data['values']['number'];
      let i, k = 0, j = 0;
      if (number % 4 !== 0) {
        k = number % 4;
      }
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
