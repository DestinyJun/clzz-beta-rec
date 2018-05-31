import { Injectable } from '@angular/core';
@Injectable()
export class LoginIdService {

  public localStorage: any;
// userName userId
  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.localStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }

  public SingleSignOn(): boolean {
    if (this.get('date')) {
      return false;
    } else {
      const date1 = Number(this.get('date'));
      const date2 = new Date().valueOf();
      if (date2 - date1 < 10) {
        this.set('date', String(new Date().valueOf()));
        return true;
      } else {
        return false;
      }
    }
  }
}
