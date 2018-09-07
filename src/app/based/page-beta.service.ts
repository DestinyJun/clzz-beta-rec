import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class PageBetaService {

  private pageNo = 1; // 当前页码
  private totalPage: number; // 最大页码
  private min = 1; // 最小页码
  private countNumber: number; // 计数总数
  private pageSize = 20; // 每页行数
  private url: string;
  constructor(private router: Router) { // 默认当前第一页，最小页码为一页
  }

  setTotalPage(totalPage) {
    this.totalPage = totalPage;
  }
  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
  setPageNo(pageNo: number) {
    this.pageNo = pageNo;
  }
  setUrl(url: string) {
    this.url = url;
  }
  getPageNo(): number {
    return this.pageNo;
  }
  getTotalPage(): number {
    return this.totalPage;
  }
  getMin(): number {
    return this.min;
  }
  getPageSize(): number {
    return this.pageSize;
  }
  nextPage(): boolean {
    console.log('nextPage');
    if (this.pageNo < this.totalPage) {
      this.pageNo++;
      this.router.navigate([this.url + '/' + this.pageNo]);
      return true;
    }
    return false;
  }

  lastPage(): boolean {
    console.log('lastPage');
    if (this.pageNo > this.min) {
      this.pageNo--;
      this.router.navigate([this.url + '/' + this.pageNo]);
      return true;
    }
    return false;
  }

  skipPage(skipNumber: number): boolean {
    if (skipNumber < this.min || skipNumber > this.totalPage) {
      return false;
    } else {
      if (skipNumber * 10 % 10 !== 0) {
        return false;
      } else {
        this.pageNo = skipNumber;
        this.router.navigate([this.url + '/' + this.pageNo]);
      }
    }
  }
}
