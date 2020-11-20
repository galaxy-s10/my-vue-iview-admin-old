import request from './request'

// 获取角色列表
export function getRoleList() {
    return request({
        url: '/api/role/list',
        method: 'get',
    })
}

// 修改某个用户的角色
export function editUserRole(val) {
    return request({
        url: '/api/role/editUserRole',
        method: 'put',
        data: { ...val }
    })
}

// 修改某个角色的权限
export function editRoleAuth(val) {
    return request({
        url: '/api/role/editRoleAuth',
        method: 'put',
        data: { ...val }
    })
}