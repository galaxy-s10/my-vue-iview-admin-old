import request from './request'

// 获取用户角色以及权限
export function getAuth(id) {
    console.log(id)
    return request({
        url: '/api/roleauth/getUserAuth',
        method: 'get',
        params: { id }
    })
}

// 获取角色列表
export function getRoleList() {
    return request({
        url: '/api/role/list',
        method: 'get',
    })
}
// 获取权限列表
export function getAuthList() {
    return request({
        url: '/api/auth/list',
        method: 'get',
    })
}
