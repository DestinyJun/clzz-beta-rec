import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'imag' = 'url';
  value = '';
  values: Array<object>;
  L = 'H';
  oid: string;
  aluminumcode: string;
  aluminumlength: string;
  targetlist: string;
  purchase: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.purchase = this.route.snapshot.params['purchase'];
    console.log(this.purchase);
    if (this.purchase === 'false') {
      this.oid = this.route.snapshot.params['oid'];
      this.aluminumcode = this.route.snapshot.params['aluminumcode'];
      this.targetlist = this.route.snapshot.params['targetlist'];
      this.aluminumlength = this.route.snapshot.params['aluminumlength'];
      this.value = 'http://120.78.138.104:8080/ColorAlum/#/mobie/' + this.targetlist + '/' + this.aluminumcode;
    } else {
      this.http.post('http://120.78.137.182/element/paQRcode', 'purchase=' + this.purchase, {
        headers: this.headers
      }).subscribe(data => {
        console.log(data);
        this.values = data['dataArr'];
      });
    }

  }

  ngOnInit() {
  }

}
