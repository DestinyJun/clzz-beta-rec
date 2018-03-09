import { Injectable } from '@angular/core';
import  'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HomeService {
  public navListToggle: Subject<boolean> = new Subject<boolean>();
  constructor() {

  }
}

export class NavList {
  constructor(
    public title: string,
    public icon: string,
    public clsstate: boolean,
    public children: NavListChild[],
    public open: boolean
  ) {}
}
export class NavListChild {
  constructor(
    public title: string,
    public setState: boolean,
    public routers: string
  ) {}
}
