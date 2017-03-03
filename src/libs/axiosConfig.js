/**
 * 把为空的参数去掉，并把currentPage，pageSize去掉
 * @param params
 * @returns {{}}
 */
export function parseParams (params) {
  let newParams = {}
  for (let key in params) {
    if (params[key] !== '') {
      newParams[key] = params[key]
    }
  }
  if (newParams['currentPage']) { delete newParams['currentPage'] }
  if (newParams['pageSize']) { delete newParams['pageSize'] }
  return newParams
}

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
