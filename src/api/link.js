import request from './request'

// 友链分页列表
export function linkPageList(params) {
    return request({
        url: '/api/link/pageList',
        method: 'get',
        params
    })
}

//友链列表
export function linklist() {
    return request({
        url: '/api/link/list',
        method: 'get'
    })
}

//添加友链
export function addLink(data) {
    console.log(data);
    return request({
        url: '/api/link/add',
        method: 'post',
        data
    })
}
//修改友链
export function editLink(data) {
    return request({
        url: '/api/link/edit',
        method: 'put',
        data
    })
}

//删除友链
export function delLink(id) {
    return request({
        url: "/api/link/del",
        method: 'delete',
        data: {
            id
        }
    })
}