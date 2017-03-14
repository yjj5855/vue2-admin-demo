import axios from 'axios'
require('promise.prototype.finally').shim()

const config = {

  // 请求方法同上
  method: 'get', // default

  // 基础url前缀
  // baseURL: 'http://116.236.230.131:55002',
  baseURL: window.env && window.env.API_HOST || 'http://172.16.3.60:8081',

  //设置超时时间
  timeout: 20000,

}

//全局配置axios
for(let key in config){
  axios.defaults[key] = config[key];
}

axios.interceptors.request.use(function (request) {
  let token = localStorage.getItem('xa_token')
  if(token && (!request.params  || request.params.send_token !== false)){
    if(request.headers){
      request.headers.xa_token = token
    }else{
      request.headers = {
        xa_token : token
      }
    }
  }else{
    if(request.params){
      delete request.params.send_token;
    }
  }
  return request
})

// response过滤
axios.interceptors.response.use(function (response) {
  if(response.headers && response.headers.xa_token){
    localStorage.setItem('xa_token', response.headers.xa_token)
  }
  // 这里提前处理返回的数据
  if(typeof response == 'object'){
    if(response.status == 200){
      return response.data;
    }
  }
  return response
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
