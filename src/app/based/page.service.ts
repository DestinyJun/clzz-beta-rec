import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class PageService {

  private nowPage = 1; // 当前页码
  private max: number; // 最大页码
  private min = 1; // 最小页码
  private countNumber: number; // 计数总数
  private Row = 20; // 每页行数
  private url: string;
  constructor(private router: Router) { // 默认当前第一页，最小页码为一页
  }

  setPage(countNumber) { // 输入总数, 设置最大页码
    this.countNumber = countNumber;
    if (countNumber % this.Row === 0 ) {
      this.max = countNumber / this.Row;
    } else {
      countNumber -= countNumber % this.Row;
      this.max = countNumber / this.Row + 1;
    }
  }
  setRow(row: number) {
    this.Row = row;
  }
  setNowPage(nowPage: number) {
    this.nowPage = nowPage;
  }
  setUrl(url: string) {
    this.url = url;
  }
  getNowPage(): number {
    return this.nowPage;
  }
  getMax(): number {
    return this.max;
  }
  getMin(): number {
    return this.min;
  }
  getNumber(): number {
    return this.countNumber;
  }
  getRow(): number {
    return this.Row;
  }
  nextPage(): boolean {
    console.log('nextPage');
    if (this.nowPage < this.max) {
      this.nowPage++;
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }

  lastPage(): boolean {
    console.log('lastPage');
    if (this.nowPage > this.min) {
      this.nowPage--;
      this.router.navigate([this.url + '/' + this.nowPage]);
      return true;
    }
    return false;
  }

  skipPage(skipNumber: number): boolean {
    console.log('skipPage');
    if (skipNumber < this.min || skipNumber > this.max) {
      return false;
    } else {
      if (skipNumber * 10 % 10 !== 0) {
        return false;
      } else {
        this.nowPage = skipNumber;
        this.router.navigate([this.url + '/' + this.nowPage]);
      }
    }
  }
}
