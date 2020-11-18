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
      router.push('/login')
      Message.error({
        content: error.response.data.message
      })
      return
    }
    return Promise.reject(error.response.data)
  }
)

export default service
