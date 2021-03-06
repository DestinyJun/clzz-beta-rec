import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {LoginIdService} from '../../../login/login-id.service';
import {Url} from '../../../getUrl';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  url = new Url().getUrl();
  row = 15;
  title = '巡检查看';
  tHead = ['#', '项目名称', '项目位置', '巡检时间', '巡检人员', '巡检描述', '查看附件'];
  prop = ['itemName', 'itemPosition', 'idt', 'inspector', 'result'];
  tBody = [];
  btnGroup = ['查看详情'];
  imgUrl: string;
  imageNames: Array<string> = [];
  normalNames: Array<string> = [];
  normalValues: Array<string> = [];
  proSystem = this.user.getSysids();
  proSystemName = this.proSystem[0]['sysName'];
  selectName = '全部';
  searchPages = 1;
  boolUrl: boolean;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, public page: PageBetaService,
              private activatedRoute: ActivatedRoute, private user: LoginIdService) {
    this.page.setUrl('/home/true/equipment/inspection');
    this.page.setPageSize(this.row);
    this.boolUrl = true;
    console.log(this.page.getPageNo());
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(Number(this.activatedRoute.snapshot.params['page']));
      this.initData();
    });
  }

  ngOnInit() {
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.initData();
    }
  }
  initData() {
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        const  body = 'page=' + this.page.getPageNo() + '&row=' + this.row + '&unitCode=' + this.proSystem[i]['sysId'];
        this.http.post('http://' + this.url + '/element-admin/find-inspection-result', body, {headers: this.headers}).subscribe(data => {
          console.log(data);
          this.tBody = data['values']['contents'];
          this.page.setTotalPage(data['values']['totalPage']);
          for (let j = 0; j < this.tBody.length; j++) {
            this.tBody[j]['inspector'] = JSON.parse(this.tBody[j]['inspector']);
            this.tBody[j]['imageNames'] = JSON.parse(this.tBody[j]['imageNames']);
          }
        });
      }
    }
  }

  pictureIndex(index) {
    this.imgUrl = this.tBody[index]['imgUrl'];
    this.imageNames = this.tBody[index]['imageNames'];
    const normal = JSON.parse(this.tBody[index]['normal']);
    console.log(normal);
    for (let i = 0; i < normal.length; i += 2) {
      this.normalNames[i / 2] = normal[i];
      this.normalValues[i / 2] = normal[i + 1];
    }
  }

  search(selectName, inputName) {
    console.log(selectName, inputName);
    this.page.setBoolUrl(this.boolUrl = false);
    this.page.setPageNo(this.searchPages);
    if (selectName === '全部') {
      selectName = '';
    }
    if (selectName !== '' || inputName !== '') {
      for (let i = 0; i < this.proSystem.length; i++) {
        if (this.proSystemName === this.proSystem[i]['sysName']) {
          const  body = 'page=' + this.searchPages + '&row=' + this.row + '&unitCode=' + this.proSystem[i]['sysId']
            + '&result=' + selectName + '&itemName=' + inputName;
          this.http.post('http://' + this.url + '/element-admin/inspection-result-search',
            body, {headers: this.headers}).subscribe(data => {
            console.log(data);
            this.tBody = data['values']['contents'];
            this.page.setTotalPage(data['values']['totalPage']);
            for (let j = 0; j < this.tBody.length; j++) {
              this.tBody[j]['inspector'] = JSON.parse(this.tBody[j]['inspector']);
              this.tBody[j]['imageNames'] = JSON.parse(this.tBody[j]['imageNames']);
            }
          });
          break;
        }
      }
    }
  }
  searchSelect(selectName, inputName) {
    console.log(selectName, inputName);
    if (this.selectName !== selectName || inputName !== '') {
      this.selectName = selectName;
      this.search(selectName, inputName);
    }
  }

  searchPage(selectName, inputName) {
    if (this.boolUrl === false) {
      this.searchPages = this.page.getPageNo();
      this.search(selectName, inputName);
    }
  }
  searchOff() {
    this.boolUrl = true;
    this.searchPages = 1;
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(Number(this.activatedRoute.snapshot.params['page']));
      this.initData();
    });
  }
}
