import request from './request'

// 获取权限列表
export function getAuthList() {
    return request({
        url: '/api/auth/list',
        method: 'get',
    })
}

