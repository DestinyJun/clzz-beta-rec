import { Component, OnInit } from '@angular/core';
import {PositionNameService} from '../../remind/position-name.service';

@Component({
  selector: 'app-position-bar',
  templateUrl: './position-bar.component.html',
  styleUrls: ['./position-bar.component.css']
})
export class PositionBarComponent implements OnInit {

  constructor(public Name: PositionNameService) {}

  ngOnInit() {
  }

}
