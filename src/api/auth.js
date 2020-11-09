import request from './request'

// 获取用户角色以及权限
export function getAuth(id) {
    return request({
        url: '/api/roleauth/getUserAuth',
        method: 'get',
        params: { id }
    })
}
