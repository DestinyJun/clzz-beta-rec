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
  constructor(private route: ActivatedRoute) {
    this.value += this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
