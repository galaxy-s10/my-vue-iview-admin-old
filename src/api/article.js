import request from './request'

export function articleList(ordername, orderby) {
  return request({
    url: '/api/article',
    method: 'get',
    params: {
      ordername,
      orderby
    }
  })
}
export function articletypelist() {
  return request({
    url: '/api/article/typelist',
    method: 'get',
  })
}
export function articlepage(params) {
  return request({
    url: '/api/article/page',
    method: 'get',
    params
  })
}
export function findArticle(id, title) {
  return request({
    url: '/api/article/find',
    method: 'get',
    params: {
      id,
      title
    }
  })
}
export function addArticle(data) {
  return request({
    url: '/api/article/add',
    method: 'post',
    data
  })
}
export function editArticle(data) {
  return request({
    url: '/api/article/edit',
    method: 'put',
    data
  })
}
export function delArticle(id) {
  return request({
    url: '/api/article/del',
    method: 'delete',
    data: {
      id
    }
  })
}
