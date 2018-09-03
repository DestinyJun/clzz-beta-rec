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
  row = 20;
  title: '巡检查看';
  tHead = ['#', '项目编号', '项目位置', '巡检时间', '巡检人员', '巡检描述', '查看附件'];
  prop = ['itemcode', 'itemposition', 'idt', 'inspector', 'description'];
  tBody = [];
  btnGroup = ['图片详情'];
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
    const  body = 'page=' + page + '&row=' + row + '&unitcode=' + this.user.getObject('user').sysids;
    this.http.post('http://' + this.url + '/element-admin/find-inspection-result', body, {headers: this.headers}).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data['values'].length; i++) {
        const inspectiondata = JSON.parse(data['values'][i]['inspectiondata']);
        const inspection = new Inspection();
        inspection.idt = data['values'][i].idt;
        inspection.itemposition = data['values'][i].itemposition;
        inspection.itemcode = data['values'][i].itemcode;
        inspection.description = inspectiondata.description;
        inspection.inspector = String(inspectiondata.inspector);
        this.tBody.push(inspection);
      }
    });
  }
}
class Inspection {
  itemcode: string;
  itemposition: string;
  idt: string;
  inspector: string;
  description: string;
}
