import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../based/page.service';

@Component({
  selector: 'app-burster',
  templateUrl: './burster.component.html',
  styleUrls: ['./burster.component.css']
})
export class BursterComponent implements OnInit {

  @Input() countNumber: number;
  @Input() row: number;
  constructor(public page: PageService) {
    this.page.setPage(this.countNumber, this.row);
  }

  ngOnInit() {
  }

}
