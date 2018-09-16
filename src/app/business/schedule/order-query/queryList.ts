export const tHead = ['订单编号', '客户名称', '合同名称', '预计发货时间', '录入人员', '订单状态', '操作'];
export const tBody = [];
export const prop = ['oid', 'cname', 'contractname', 'exshiptime', 'submitter', 'ostatus'];
export const btnGroup = ['修改', '删除'];
export const dataName = [
  ['合同名', '客户名', '单价(元/平方米)', '总价(元)'],
  ['铝板类型', '铝板面积(平方米)', '铝板宽度(毫米)', '铝板厚度(微米)'],
  ['背漆类型', '背漆成像', '背漆方案'],
  ['底漆类型', '底漆成像', '底漆方案'],
  ['面漆类型', '面漆成像', '面漆方案'],
  ['联系电话', '国家', '省份', '城市'],
  ['控制误差', '预计交货时间', '预计发货时间', '地址'],
];
export const propType = [
  ['type', 'type', 'number', 'number'],
  ['type', 'number', 'number', 'number'],
  ['type', 'type', 'number'],
  ['type', 'type', 'number'],
  ['type', 'type', 'number'],
  ['type', 'type', 'type', 'type'],
  ['number', 'date', 'date', 'type'],
];
export const modalProp = [
  ['contractname', 'cname', 'price', 'amount'],
  ['altype', 'area', 'alwidth', 'althickness'],
  ['btype', 'bccd', 'bprogram'],
  ['ptype', 'pccd', 'pprogram'],
  ['ftype', 'fccd', 'fprogram'],
  [ 'tel', 'country', 'province', 'city'],
  ['deviation', 'exdelitime', 'exshiptime', 'address']
];
