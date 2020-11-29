import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from "../router";
import cache from '@/libs/cache'
import { Message } from 'iview'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

let companyUrl = 'https://voiceapi.tsiji.com'
let myUrl = 'https://www.zhengbeining.com'

const service = axios.create({
  // baseURL: myUrl,
  timeout: 5000
})
const service1 = axios.create({
  baseURL: companyUrl,
  timeout: 5000
})



// 请求拦截
service.interceptors.request.use(
  config => {
    NProgress.start()
    let token = cache.getStorageExt("token")
    // console.log(token)
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    NProgress.done()
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    console.log(error.message);
    console.log(error.response);
    console.log('object');
    if (error.response && error.response.status != 500) {
      if (error.response.status == 401 || error.response.status == 403) {
        cache.clearStorage("token")
        if (router.currentRoute.path != '/login') {
          router.push('/login')
        }
        console.log(error.response.data.message)
        Message.error({
          content: error.response.status + "：" + error.response.data.message
          // content: '401错误：' + error.response.data.message
        })
        // 下面有个return，代表不会继续向下执行
        // 也就是说，如果网络请求报了401，有return，就不会继续执行axios，就不会返回reject
        return
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)


export function aaa() {

}

export { service1 }

export default service
