import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
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
