import axios from 'axios'
import store from '@/store'
import router from "../router";
import cache from '@/libs/cache'
import { Message } from 'iview'


const service = axios.create({
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    let token = cache.getStorageExt("token")
    // console.log(token)
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status == 401) {
      cache.clearStorage("token")
      if (router.currentRoute.path != '/login') {
        router.push('/login')
      }
      console.log(error.response.data.message)
      Message.error({
        content: error.response.data.message
        // content: '401错误：' + error.response.data.message
      })
      // 下面有个return，代表不会继续向下执行
      // 也就是说，如果网络请求报了401，axios就不会返回reject
      return
    }
    return Promise.reject(error.response.data)
  }
)

export default service
