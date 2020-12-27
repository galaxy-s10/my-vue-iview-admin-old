import request from './request'

// 获取前台信息
export function getFront() {
    return request({
        url: '/api/front/detail',
        method: 'get',
    })
}

// 更新前台信息
export function updateFront(data) {
    return request({
        url: '/api/front/update',
        method: 'put',
        data
    })
}

