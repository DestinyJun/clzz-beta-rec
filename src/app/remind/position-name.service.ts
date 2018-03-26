import { Injectable } from '@angular/core';

@Injectable()
export class PositionNameService {

  private PoName: string;
  constructor() { }

  InitName(name: string) {
    this.PoName = name;
  }
  getName() {
    return this.PoName;
  }
}
