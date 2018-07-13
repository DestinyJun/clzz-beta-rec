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
  videoTree = {
    'name': '总平台', 'open': 20, 'child': [
      {'name': '一号视频窗口', 'open': 20, 'child': []},
      {'name': '二号视频窗口', 'open': 20, 'child': []},
      {'name': '三号视频窗口', 'open': 20, 'child': []},
      {'name': '四号视频窗口', 'open': 20, 'child': []}
    ]
  };
  constructor(private http: HttpClient) {
    this.QueryCameraNumber({
      gid: 1,
      page: 1,
      row: 1
    });
  }

  ngOnInit() {
  }

  toggleOpenUl3() {
    console.log('ul3');
    if (this.videoTree.open) {
      for (let i = 0; i < this.videoTree.child.length; i++) {
        this.videoTree.child[i].open = 20;
      }
      this.videoTree.open = 20;
    } else {
      this.videoTree.open += this.videoTree.child.length * 20;
    }
  }
  toggleOpenUl2(index) {
    console.log('ul2');
    if (this.videoTree.child[index].open === 20) {
      for (let i = 0; i < this.videoTree.child.length; i++) {
        if (this.videoTree.child[i].open > 20) {
          this.videoTree.open -= (this.videoTree.child[i].open - 20);
          this.videoTree.child[i].open = 20;
        }
      }
      this.videoTree.child[index].open += this.videoTree.child[index].child.length * 20;
      this.videoTree.open += this.videoTree.child[index].child.length * 20;
    } else {
      this.videoTree.open -= (this.videoTree.child[index].open - 20);
      this.videoTree.child[index].open = 20;
    }
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
      this.camera.map((value, index) => {
        switch (index % 4) {
          case 0: this.camera1.push(value); break;
          case 1: this.camera2.push(value); break;
          case 2: this.camera3.push(value); break;
          case 3: this.camera4.push(value); break;
        }
      });
      console.log(this.camera1);
    });
    console.log(this.parameterSerialization({
      starttime: new Date().getTime(),
      timecell: 10
    }));
    this.http.post('http://192.168.28.69:9080/EquipmentInspection/item-info/add', this.parameterSerialization({
      starttime: new Date().getTime(),
      timecell: 10
    }), {headers: this.headers})
      .subscribe(data => {
        console.log(data);
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
