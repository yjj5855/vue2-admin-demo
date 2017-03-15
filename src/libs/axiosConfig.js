import axios from 'axios'
import env from '../env/env'
require('promise.prototype.finally').shim()

const config = {

  // 请求方法同上
  method: 'get', // default

  // 基础url前缀
  // baseURL: 'http://116.236.230.131:55002',
  baseURL: window.env && window.env.API_HOST || env.API_HOST,

  //设置超时时间
  timeout: 20000,

  //状态码 处理  status >= 200 && status < 300; // default
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  }

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
  if(error && error.response && error.response.status == 401 && error.response.data){
    return Promise.reject(error.response.data)
  }else{
    return Promise.reject({ reasons: [{
      field: "",
      message: "接口请求失败",
      msg_id: "error.0000"
    }]})
  }
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
