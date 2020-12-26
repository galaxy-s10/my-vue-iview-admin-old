import request from './request'

//标签列表
export function taglist(size) {
    return request({
        url: '/api/tag/list',
        method: 'get',
        params: {
            size
        }
    })
}

//标签列表分页
export function tagPageList(params) {
    return request({
        url: '/api/tag/tagPage',
        method: 'get',
        params,
    })
}

//修改标签
export function editTag(data) {
    return request({
        url: '/api/tag/edit',
        method: 'put',
        data
    })
}

//添加标签
export function addTag(data) {
    return request({
        url: '/api/tag/add',
        method: 'post',
        data
    })
}

//删除标签
export function delTag(id) {
    return request({
        url: '/api/tag/del',
        method: 'delete',
        data: {
            id
        }
    })
}