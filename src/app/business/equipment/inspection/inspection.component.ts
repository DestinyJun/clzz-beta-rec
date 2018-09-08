import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {Url} from '../../../getUrl';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  url = new Url().getUrl();
  row = 15;
  title: '巡检查看';
  tHead = ['#', '项目编号', '项目位置', '巡检时间', '巡检人员', '巡检描述', '查看附件'];
  prop = ['itemCode', 'itemPosition', 'idt', 'inspector', 'description'];
  tBody = [];
  btnGroup = ['图片详情'];
  imgUrl: string;
  imageNames: Array<string> = [];
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, public page: PageService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.page.setUrl(this.url);
    this.page.setRow(this.row);
    console.log(this.page.getNowPage());
    this.activatedRoute.params.subscribe(() => {
      console.log(1);
      this.page.setNowPage(Number(this.activatedRoute.snapshot.params['page']));
      this.getData(this.page.getNowPage(), this.page.getRow());
    });
  }

  ngOnInit() {
  }

  getData(page: number, row: number) {
    console.log(page);
    const  body = 'page=' + page + '&row=' + row + '&unitCode=' + this.user.getObject('user').sysids;
    this.http.post('http://' + this.url + '/element-admin/find-inspection-result', body, {headers: this.headers}).subscribe(data => {
      console.log(data);
      this.tBody = data['values']['contents'];
      for (let i = 0; i < this.tBody.length; i++) {
        this.tBody[i]['inspector'] = JSON.parse(this.tBody[i]['inspector']);
        this.tBody[i]['imageNames'] = JSON.parse(this.tBody[i]['imageNames']);
      }
    });
  }

  pictureIndex(index) {
    this.imgUrl = this.tBody[index]['imgUrl'];
    this.imageNames = this.tBody[index]['imageNames'];
    for (let i = 0; i < this.imageNames.length; i++) {
      this.imageNames[i] = this.imgUrl + '/' + this.imageNames[i];
    }
  }
}
