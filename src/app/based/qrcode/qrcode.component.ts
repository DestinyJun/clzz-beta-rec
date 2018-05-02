import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'imag' = 'url';
  value = '';
  L = 'H';
  oid: string;
  aluminumcode: string;
  aluminumlength: string;
  targetlist: string;
  constructor(private route: ActivatedRoute) {
    this.oid = this.route.snapshot.params['oid'];
    this.targetlist = this.route.snapshot.params['targetlist'];
    this.aluminumlength = this.route.snapshot.params['aluminumlength'];
    this.value = 'http://120.78.138.104:8080/ColorAlum/#/mobie/' + this.targetlist + '/' + this.aluminumcode;
  }

  ngOnInit() {
  }

}
