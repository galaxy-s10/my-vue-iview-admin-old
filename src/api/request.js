import axios from 'axios'
import store from '@/store'
import cache from '@/libs/cache'

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
    console.log(error)
    return Promise.reject(error.response.data)
  }
)

export default service
