import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  camera: Array<Camera> = [];
  Cam: Array<Camera> = [];
  baseHeight = 30;
  baseColor = '#209E91';
  vlcV: Array<any> = [];
  vlcVName: Array<string> = [];
  urlName = 'outer_url';
  toggleTitle = '当前外网';
  videoTree = {
    'name': '总平台', 'icon': 'glyphicon glyphicon-triangle-right', 'open': this.baseHeight, 'color': false, 'child': [
      {'name': '一号视频窗口', 'icon': 'glyphicon glyphicon-triangle-right', 'open': this.baseHeight, 'color': false, 'child': this.Cam},
      {'name': '二号视频窗口', 'icon': 'glyphicon glyphicon-triangle-right', 'open': this.baseHeight, 'color': false, 'child': this.Cam},
      {'name': '三号视频窗口', 'icon': 'glyphicon glyphicon-triangle-right', 'open': this.baseHeight, 'color': false, 'child': this.Cam},
      {'name': '四号视频窗口', 'icon': 'glyphicon glyphicon-triangle-right', 'open': this.baseHeight, 'color': false, 'child': this.Cam}
    ]
  };
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private user: LoginIdService) {
    this.QueryCameraNumber({
      gid: 1,
      page: 1,
      row: 1,
      sysids: this.user.getObject('user').sysids
    });
  }

  ngOnInit() {
  }

  toggleUrl() {
    this.urlName = this.urlName === 'outer_url' ? 'inner_url' : 'outer_url';
    this.toggleTitle = this.toggleTitle === '当前内网' ? '当前外网' : '当前内网';
    this.vlcVideo(0, 0);
    this.vlcVideo(1, 0);
    this.vlcVideo(2, 0);
    this.vlcVideo(3, 0);
  }
  vlcVideo(number, index) {
    const html =
      '            <object type=\'application/x-vlc-plugin\' id=\'vlc${obj[number].place}\' width="100%" height="300" events=\'True\'\n' +
      '                    pluginspage="http://www.videolan.org"\n' +
      '                    codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.1/npapi-vlc-2.2.1.tar.xz">\n' +
      '              <param name=\'mrl\' value=' + this.videoTree.child[number].child[index][this.urlName] + ' />\n' +
      '              <param name=\'volume\' value=\'30\' />\n' +
      '              <param name=\'autoplay\' value=\'true\' />\n' +
      '              <param name=\'loop\' value=\'false\' />\n' +
      '              <param value="transparent" name="wmode">\n' +
      '              <embed id=\'vlc1\' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="450"\n' +
      '                     pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"\n' +
      '                     src=' + this.videoTree.child[number].child[index][this.urlName] + '>\n' +
      '            </object>\n';
     this.vlcV[number] = this.sanitizer.bypassSecurityTrustHtml(html);
     this.vlcVName[number] = this.videoTree.child[number].child[index].value;
     this.videoTree.child[number].child.map((value, i) => {
       if (i === index) {
         value.color = true;
       } else {
         value.color = false;
       }
     });
  }
  toggleOpenUl3() {
    console.log('ul3');
    if (this.videoTree.open > this.baseHeight) {
      for (let i = 0; i < this.videoTree.child.length; i++) {
        this.videoTree.child[i].open = this.baseHeight;
        this.videoTree.child[i].color = false;
      }
      this.videoTree.open = this.baseHeight;
      this.videoTree.color = false;
    } else {
      this.videoTree.open += this.videoTree.child.length * this.baseHeight;
    }
    this.videoTree.color = true;
  }
  toggleOpenUl2(index) {
    console.log('ul2');
    if (this.videoTree.child[index].open === this.baseHeight) {
      for (let i = 0; i < this.videoTree.child.length; i++) {
        if (this.videoTree.child[i].open > this.baseHeight) {
          this.videoTree.open -= (this.videoTree.child[i].open - this.baseHeight);
          this.videoTree.child[i].open = this.baseHeight;
          this.videoTree.child[i].color = false;
        }
      }
      this.videoTree.child[index].open += this.videoTree.child[index].child.length * this.baseHeight;
      this.videoTree.open += this.videoTree.child[index].child.length * this.baseHeight;
      this.videoTree.child[index].color = true;
    } else {
      this.videoTree.open -= (this.videoTree.child[index].open - this.baseHeight);
      this.videoTree.child[index].open = this.baseHeight;
      this.videoTree.child[index].color = false;
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
    console.log(body);
    this.http.post('http://120.78.137.182/element/QueryCamera', body, {
      headers: this.headers
    }).subscribe(data => {
      console.log(data);
      this.QueryCamera({
        gid: 1,
        page: 1,
        row: data['values']['number'],
        sysids: this.user.getObject('user').sysids
      });
    });
  }
  QueryCamera(obj) {
    const camera0: Array<Camera> = [];
    const camera1: Array<Camera> = [];
    const camera2: Array<Camera> = [];
    const camera3: Array<Camera> = [];
    const body = this.parameterSerialization(obj);
    console.log(body);
    this.http.post('http://120.78.137.182/element/QueryCamera', body, {
      headers: this.headers
    }).subscribe(data => {
      this.camera = data['values']['datas'];
      this.camera.map((value, index) => {
        switch (index % 4) {
          case 0:
            camera0.push(value);
            break;
          case 1:
            camera1.push(value);
            break;
          case 2:
            camera2.push(value);
            break;
          case 3:
            camera3.push(value);
            break;
        }
      });
      this.videoTree.child[0].child = camera0;
      this.videoTree.child[1].child = camera1;
      this.videoTree.child[2].child = camera2;
      this.videoTree.child[3].child = camera3;
      console.log(this.videoTree.child[0].child);
      this.vlcVideo(0, 0);
      this.vlcVideo(1, 0);
      this.vlcVideo(2, 0);
      this.vlcVideo(3, 0);
    });
  }
}
class Camera {
  id: string;
  value: string;
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
  color = false;
}
