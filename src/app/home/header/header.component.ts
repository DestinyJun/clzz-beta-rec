import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public infoToggle: boolean;
  public scrollToggle: boolean;
  private navListToggle: boolean;
  constructor(private homeService: HomeService) {
    this.infoToggle = true;
    this.scrollToggle = true;
    this.navListToggle = true;
  }

  ngOnInit() {
  }
  public onToggleInfo(): void {
    this.infoToggle = !this.infoToggle;
  }
  public onScrollToggle(): void {
    this.scrollToggle = !this.scrollToggle;
  }
  public onNavListToggle(): void  {}

}
