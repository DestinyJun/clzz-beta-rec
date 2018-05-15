import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  state = true;
  @Output() InfoTg = new EventEmitter();
  @Output() sidebar = new EventEmitter();
  constructor() { }

  infoTg() {
    this.InfoTg.emit(true);
  }
  ngOnInit() {
  }
  ToggleState() {
    this.state = !this.state;
  }
  wi() {
    return window.innerWidth < 768;
  }
  SideBar() {
    console.log('home');
    if (window.innerWidth < 768) {
      this.ToggleState();
    }
    this.sidebar.emit(22);
  }

}
