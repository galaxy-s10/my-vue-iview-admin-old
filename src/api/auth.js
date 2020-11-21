import request from './request'

// 获取权限列表
export function getAuthList() {
    return request({
        url: '/api/auth/list',
        method: 'get',
    })
}

// 获取某个用户的所有权限
export function getUserAuth(id) {
    return request({
        url: '/api/auth/getUserAuth',
        method: 'get',
        params: { id }
    })
}

