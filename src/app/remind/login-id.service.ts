import { Injectable } from '@angular/core';

@Injectable()
export class LoginIdService {

  private Sid: string;
  constructor() { }

  InitId(id: string) {
    this.Sid = id;
  }
  getId() {
    return this.Sid;
  }
}
