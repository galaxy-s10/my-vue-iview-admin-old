import request from './request'

export function getUserList(params) {
  return request({
    url: '/api/user/pageList',
    method: 'get',
    params
  })
}

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/user/getuserinfo',
    method: 'get',
    // es6简写
    // params: { token }
    params: {
      token
    }
  })
}

export function findUser(id) {
  return request({
    url: '/api/user/findUser',
    method: 'get',
    params: {
      id
    }
  })
}

// export function addUser(data) {
//   return request({
//     url: '/api/user/addUser',
//     method: 'post',
//     data
//   })
// }

export function updateUser(data) {
  return request({
    url: '/api/user/update',
    method: 'put',
    data
  })
}

export function updateUserStatus(data) {
  return request({
    url: '/api/user/updateStatus',
    method: 'put',
    data
  })
}

export function deleteuser(id) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    data: {
      id
    }
  })
}
