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
  ptype: string;
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
  ['采购单号', '总重量(千克)', '单价(元/千克)', '总价(元)'],
  ['铝板型号', '铝板宽度(毫米)', '铝卷厚度(微米)', '铝卷密度'],
  [ '厂家名称', '生产系统'],
];
export const AlModalProp = [
  ['purchase', 'alExpectWeight', 'alPrice', 'amount'],
  ['alType', 'alWidth', 'alThickness', 'alDensity'],
  [ 'supName', 'proSystem'],
];
export const AlType = [
  ['type', 'number', 'number', 'number'],
  ['type', 'number', 'number', 'number'],
  [ 'type', '生产系统'],
];
export const PtDataName = [
  ['采购单号', '总重量(千克)', '单价(元/千克)', '总价(元)'],
  ['油漆名称', '油漆固化物含量(%)', '油漆挥发份含量(%)', '油漆密度'],
  ['稀释剂名称', '稀释剂总重量(千克)', '稀释剂单价(元/千克)', '稀释剂总价(元)'],
  ['稀释剂类型', '稀释剂固化物含量(%)', '稀释剂挥发份含量(%)'],
  ['稀释剂产品编号', '油漆类型', '油漆厂家名称', '生产系统'],
];
export const PtType = [
  ['type', 'number', 'number', 'number'],
  ['type', 'number', 'number', 'number'],
  ['type', 'number', 'number', 'number'],
  ['type', 'number', 'number', 'number'],
  ['type', 'type', 'type', 'pro_system'],
];
export const PtModalProp = [
  ['purchase', 'paExpectWeight', 'price', 'pamount'],
  ['pName', 'pCondensate', 'pVolatile', 'pDensity'],
  ['dName', 'diExpectWeight', 'dPrice', 'damount'],
  ['dType', 'condensate', 'dVolatile'],
  ['supNum', 'ptype', 'supName', 'proSystem'],
];
export const PtName = ['分桶号', '分桶重量'];
export const PtdName = ['分桶号', '分桶重量'];
export const PtProp = ['supId', 'paintWeight'];
export const PtdProp = ['supNum', 'diluentWeight'];
export const AlName = ['分卷号', '分卷重量'];
export const AlProp = ['supId', 'alWeight'];
