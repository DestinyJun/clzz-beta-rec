import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'imag' = 'url';
  value = 'http://22/';
  L = 'H';
  oid: string;
  aluminumcode: string;
  aluminumlength: string;
  constructor(private route: ActivatedRoute) {
    this.oid = this.route.snapshot.params['oid'];
    this.aluminumcode = this.route.snapshot.params['aluminumcode'];
    this.aluminumlength = this.route.snapshot.params['aluminumlength'];
    this.value += this.oid;
  }

  ngOnInit() {
  }

}
