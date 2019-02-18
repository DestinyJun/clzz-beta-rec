export const tHead = ['订单编号', '项目名称', '预计发货时间', '录入人员', '订单状态', '操作'];
export const tBody = [];
export const prop = ['oid', 'cname', 'exshiptime', 'submitter', 'ostatus'];
export const btnGroup = ['修改', '删除'];
export const dataName = [
  ['项目名'],
  ['合金状态', '铝板总重量（吨）', '铝板宽度（毫米）', '铝板厚度（微米）'],
  ['背漆类型', '底漆类型', '面漆类型'],
  ['背漆颜色', '底漆颜色', '面漆颜色'],
  ['背漆上机粘度', '底漆上机粘度', '面漆上机粘度'],
  ['是否双面涂', '花纹有无'],
  ['国家', '省份', '城市', '客户地址'],
  ['预计交货时间', '预计发货时间', '联系电话', '生产线'],
];
export const propType = [
  ['type'],
  ['type', 'number', 'number', 'number'],
  ['type', 'type', 'number', 'type'],
  ['type', 'type', 'number', 'type'],
  ['type', 'type', 'number', 'type'],
  // ['type', 'type', 'type', 'type'],
  ['number', 'date', 'type', 'type'],
];
export const modalProp = [
  ['cname'],
  ['altype', 'alWeight', 'alwidth', 'althickness'],
  ['btype', 'ptype', 'ftype'],
  ['backColor', 'primerColor', 'finishColor'],
  ['bprogram', 'pprogram', 'fprogram'],
  ['doublecloat', 'figura'],
  ['country', 'province', 'city', 'address'],
  ['exdelitime', 'exshiptime', 'tel', 'pro_system']
];
