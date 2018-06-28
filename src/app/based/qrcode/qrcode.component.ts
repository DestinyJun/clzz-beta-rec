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
  di: Array<QRcodedi>;
  pa: Array<QRcodepa>;
  al: Array<QRcodeal>;
  mode: string;
  L = 'H';
  oid: string;
  aluminumcode: string;
  aluminumlength: string;
  targetlist: string;
  purchase: string;
  address: string;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.purchase = this.route.snapshot.params['purchase'];
    console.log(this.purchase);
    if (this.purchase === 'false') {
      this.oid = this.route.snapshot.params['oid'];
      this.aluminumcode = this.route.snapshot.params['aluminumcode'];
      this.targetlist = this.route.snapshot.params['targetlist'];
      this.aluminumlength = this.route.snapshot.params['aluminumlength'];
      this.address = this.route.snapshot.params['address'];
      this.value = 'http://120.78.138.104:8080/ColorAlum/#/mobie/' + this.targetlist + '/' + this.aluminumcode + '/' + this.address;
    } else {
      this.mode = this.route.snapshot.params['mode'];
      console.log(this.mode !== '0');
      if (this.mode !== '0') {
        this.http.post('http://120.78.137.182/element/paQRcode', 'purchase=' + this.purchase, {
          headers: this.headers
        }).subscribe(data => {
          console.log(data);
          this.pa = data['QRcode_pa'];
          this.di = data['QRcode_di'];
        });
      } else {
        this.http.post('http://120.78.137.182/element/alQRcode', 'purchase=' + this.purchase, {
          headers: this.headers
        }).subscribe(data => {
          console.log(data);
          this.al = data['QRcode'];
          console.log(this.al);
        });
      }

    }

  }

  diToString( obj: QRcodedi) {
    return 'diluent_weight' + obj.diluent_weight + 'url' + obj.url +
      'diluent_type' + obj.diluent_type + 'diluent_id' + obj.diluent_id;
  }
  paToString( obj: QRcodepa) {
    return 'paint_weight' + obj.paint_weight + 'url' + obj.url +
      'paint_type' + obj.paint_type + 'paint_id' + obj.paint_id;
  }
  alToString( obj: QRcodeal) {
    return 'al_weight' + obj.al_weight + 'url' + obj.url +
      'al_type' + obj.al_type + 'al_id' + obj.al_id;
  }
  ngOnInit() {
  }

}
class QRcodedi {
  diluent_weight: string;
  url: string;
  diluent_type: string;
  diluent_id: string;
}
class QRcodepa {
  paint_weight: string;
  paint_type: string;
  paint_id: string;
  url: string;
}
class QRcodeal {
  url: string;
  al_id: string;
  al_type: string;
  al_weight: string;
}
