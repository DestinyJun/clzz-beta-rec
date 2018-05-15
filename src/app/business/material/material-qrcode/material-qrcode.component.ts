import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-qrcode',
  templateUrl: './material-qrcode.component.html',
  styleUrls: ['./material-qrcode.component.css']
})
export class MaterialQrcodeComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'imag' = 'url';
  value = '';
  L = 'H';
  constructor() { }

  ngOnInit() {
  }

}
