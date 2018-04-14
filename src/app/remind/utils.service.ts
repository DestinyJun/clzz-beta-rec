import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class UtilsService {
  public toastChange: EventEmitter<any>;
  toast(data) {
    this.toastChange.emit(data);
  }
}
