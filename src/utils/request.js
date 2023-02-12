import axios from 'axios'
import { Notify } from 'quasar'
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口
  baseURL: process.env.BASE_API,
  // 超时时间 单位是ms
  timeout: 600 * 1000
})
const servicedownload = axios.create({
  // 公共接口
  baseURL: process.env.BASE_API,
  // 超时时间 单位是ms
  timeout: 20 * 1000,
  responseType: 'blob'
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          router.push('/login')
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = '连接出错'
      }
    } else {
      error.message = '连接服务器失败!'
    }
    
    Notify.create({
      color:"red",
      message:error.message,
      position:"top",
      timeout: 3000
    })
    return Promise.reject(error)
  }
)

// 2、封装请求方式
// @param url 接口地址
// @param data 携带参数
// @param file 上传文件对象
// @param auth 是否携带token
// get请求
export function get(url, data) {
  return service.get(url, data)
}

// post请求
export function post(url, data) {
  return service.post(url, data)
}

// put请求
export function put(url, data) {
  return service.put(url, data)
}

// delete 请求
export function del(url, data) {
  return service.delete(url, data)
}

// upload 请求
export function uploader(url, file) {
  let params = new FormData()
  params.append('file', file)
  return service.post(url, params)
}
// upload 请求
export function download(url, data) {
  return servicedownload.get(url, data)
}
export default service
