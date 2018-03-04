import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css']
})
export class MaterialMessageComponent implements OnInit {


  page = 1;
  aluminums = [];
  prints = [];
  AllOrders: number;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.SeeOrders();
  }

  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"5",\n' +
      '\t"status":"' + 2 + '",\n' +
      '\t"mode":"' + 0 + '"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/findrawpage', body)
      .subscribe(data => {
        console.log(data);
        this.aluminums = data['values1'];
      });
  }
  NextPage() {
    if (this.AllOrders > this.page * 10) {
      this.page++;
      this.SeeOrders();
    }
  }

  ProPage() {
    if (this.page > 1) {
      this.page--;
      this.SeeOrders();
    }
  }

}
