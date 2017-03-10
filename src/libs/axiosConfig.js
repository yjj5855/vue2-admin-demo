import axios from 'axios'
require('promise.prototype.finally').shim()

const config = {

  // 请求方法同上
  method: 'get', // default

  // 基础url前缀
  // baseURL: 'http://116.236.230.131:55002',
  baseURL: 'http://172.16.3.60:8080',

  //设置超时时间
  timeout: 20000,

}

//全局配置axios
for(let key in config){
  axios.defaults[key] = config[key];
}

axios.interceptors.request.use(function (request) {
  // let infoJson = _localStorage.getItem('infoJson') || {}
  // let token = infoJson.token;
  request.headers.xa_token = ''

  return request
})

// response过滤
axios.interceptors.response.use(function (response) {
  // 这里提前处理返回的数据
  if(typeof response == 'object'){
    if(response.status == 200){
      return response.data;
    }else{

    }
  }else{

  }
  return response;
}, function (error) {

  return Promise.reject(error);
});


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
