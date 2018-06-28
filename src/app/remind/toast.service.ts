import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToastService {

  constructor() {
    this.setSelectedPoint(this.Information);
    this.currentSelectedPoint().subscribe(value => {console.log(value); });
  }

  @Output() toastEvent = new EventEmitter();
  public Information = '1000';
  private _selectedPoint: Subject<any> = new Subject<any>();

  public toastEmit() {
    this.toastEvent.emit('8888');
  }
  public setSelectedPoint(selectedPointsIfo: any): void {
    this._selectedPoint.next(selectedPointsIfo);

  }

  public currentSelectedPoint(): Observable<any> {
    return this._selectedPoint.asObservable();
  }


}
