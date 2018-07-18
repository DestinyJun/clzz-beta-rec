import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  private now: number; // 当前页码
  private max: number; // 最大页码
  private min: number; // 最小页码
  private countNumber: number; // 计数总数
  private Row: number; // 每页行数
  constructor() { // 默认当前第一页，最小页码为一页
    this.now = 1;
    this.min = 1;
  }

  setPage(countNumber, Row) { // 输入总数,每页行数, 设置最大页码，每页行数
    this.countNumber = countNumber;
    this.Row = Row;
    if (countNumber % Row === 0 ) {
      this.max = countNumber / Row;
    } else {
      countNumber -= countNumber % Row;
      this.max = countNumber / Row + 1;
    }
  }

  getNow(): number {
    return this.now;
  }
  getMax(): number {
    return this.max;
  }
  getMin(): number {
    return this.min;
  }
  getCountNumber(): number {
    return this.countNumber;
  }
  getRow(): number {
    return this.Row;
  }

  skipNextPage(): boolean {
    if (this.now < this.max) {
      this.now++;
      return true;
    }
    return false;
  }

  skipLastPage(): boolean {
    if (this.now > this.min) {
      this.now--;
      return true;
    }
    return false;
  }

  skipAnyPage(skipNumber: number): boolean {
    if (skipNumber < this.min || skipNumber > this.max) {
      return false;
    } else {
      if (skipNumber * 10 % 10 !== 0) {
        return false;
      } else {
        this.now = skipNumber;
      }
    }
  }
}
