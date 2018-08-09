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
  alexweight: number;
  altype: string;
  alwidth: number;
  althickness: number;
  aldensity: string;
  alprice: number;
  supname: string;
  wid: string;
  auditor: string;
  pro_system: string;
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
  pname: string;
  pdensity: number;
  pcondensate: number;
  ptype: string;
  pvolatile: number;
  price: number;
  paex_weight: number;
  supname: string;
  wid: string;
  auditor: string;
  dname: string;
  dtype: string;
  condensate: number;
  dvolatile: number;
  dprice: number;
  diex_weight: number;
  pro_system: string;
  arr1: Array<PArr> = [];
  arr2: Array<DArr> = [];
}
