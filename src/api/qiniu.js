import request from './request'

export function updateQiniu(data) {
  console.log(data);
  return request({
    url: '/api/qiniu/updateQiniu',
    method: 'put',
    data
  })
}

export function getQiniuToken() {
  return request({
    url: '/api/qiniu/token',
    method: 'get'
  })
}

export function delQiniuImg(filename) {
  return request({
    url: '/api/qiniu/del',
    method: 'get',
    params: {
      filename
    }
  })
}

export function getQiniuList(params) {
  return request({
    url: '/api/qiniu/getList',
    method: 'get',
    params
  })
}
