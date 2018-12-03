import {Input} from '@angular/core';

export class Aluminums {
  purchase: string;
  alex_weight: string;
  altype: string;
  alwidth: string;
  althickness: string;
  aldensity: string;
  alprice: string;
  status: string;
  creator: string;
  idt: string;
  pro_auditor: string;
  upt: string;
  supplier: string;
  w_id: string;
  pro_system: string;
  amount: string;
  auditor: string;
}
export class Paint {
  pname: string;
  purchase: string;
  pdensity: string;
  pcondensate: string;
  ptype: string;
  pvolatile: string;
  price: string;
  paex_weight: string;
  diluentweight: string;
  diluent_id: string;
  supname: string;
  wid: string;
  auditor: string;
  dname: string;
  diluent_type: string;
  condensate: string;
  dvolatile: string;
  diluent_price: string;
  diluent_weight: string;
  pro_system: string;
  pamount: string;
  damount: string;
}
export class Arr {
  supid: string;
  alweight: number;
}
export class ALJson  {
  purchase: string;
  alExpectWeight: number;
  alType: string;
  alWidth: number;
  alThickness: number;
  alDensity: string;
  alPrice: number;
  supName: string;
  auditor: string;
  proSystem: string;
  arr: Array<Arr> = [];
}
export class PArr {
  paint_weight: number;
  supid: string;
}
export class DArr {
  diluent_weight: number;
  supnum: string;
}
export class PaintJson {
  purchase: string;
  pName: string;
  pDensity: number;
  pCondensate: number;
  pType: string;
  pVolatile: number;
  price: number;
  paExpectWeight: number;
  supName: string;
  auditor: string;
  dName: string;
  dType: string;
  condensate: number;
  dVolatile: number;
  diExpectWeight: number;
  proSystem: string;
  dPrice: number;
  arr1: Array<PArr> = [];
  arr2: Array<DArr> = [];
}
export const AlDataName = [
  ['原料批号', '总重量(千克)', '合金状态'],
  ['铝板宽度(毫米)', '铝卷厚度(微米)', '厂家名称'],
  [ '生产系统'],
];
export const AlModalProp = [
  ['purchase', 'alExpectWeight', 'alType'],
  [ 'alWidth', 'alThickness',  'supName'],
  ['proSystem'],
];
export const AlType = [
  ['text', 'number', 'number'],
  ['number', 'number', 'text'],
  [ 'text'],
];
export const PtDataName = [
  ['原料批号', '厂家名称'],
  ['油漆类型', '油漆颜色', '油漆用途', '油漆总重量'],
  ['稀释剂类型', '稀释剂用途', '稀释剂总重量(千克)', '生产系统'],
];
export const PtType = [
  ['text', 'text'],
  ['text', 'text', 'text', 'number'],
  ['text', 'text', 'text', 'text'],
];
export const PtModalProp = [
  ['purchase', 'supName'],
  ['pType', 'paintColor', 'paintPurpose', 'paExpectWeight'],
  ['dType', 'diluentPurpose', 'diExpectWeight', 'proSystem'],
];
export const PtName = ['分桶号', '分桶重量'];
export const PtdName = ['分桶号', '分桶重量'];
export const PtProp = ['supid', 'paintWeight'];
export const PtdProp = ['supNum', 'diluentWeight'];
export const AlName = ['分卷号', '分卷重量'];
export const AlProp = ['supId', 'alWeight'];
