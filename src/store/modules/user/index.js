import { getAuth } from "@/api/auth";
import { login, getUserInfo } from "@/api/user";
import cache from '@/libs/cache'
const user = {
    // 加了命名空间，mutations,actions,getters都要带上模块名
    // （state加不加命名空间都要带模块名）
    namespaced: true,
    state: () => ({
        token: "",
        remember: true,    // 七天免登陆
        roleAuth: {},
        username: "",
        id: "",
        role: "",
        avatar: "",
        title: ""
    }),
    mutations: {
        editRemember(state, payload) {
            // console.log(state, payload)
            state.remember = payload
        },
        setUser(state, payload) {
            // console.log(payload)
            const { id, username, role, avatar, title } = payload
            state.id = id
            state.username = username
            state.role = role
            state.avatar = avatar
            state.title = title
        },
        setRoleAuth(state, payload) {
            // console.log(payload)
            state.roleAuth = payload
        },

    },
    actions: {
        login({ state }, userInfo) {
            return new Promise((reslove, reject) => {
                login(userInfo).then(res => {
                    console.log(res)
                    reslove(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },
        // 获取用户信息
        getUserInfo({ commit, state }) {
            // let res = cache.getStorageExt('token')
            return new Promise((resolve, reject) => {
                console.log('0000')
                // console.log(state.token)
                getUserInfo(state.token).then(res => {
                    const { userinfo } = res
                    commit('setUser', userinfo)
                    if (res.code == 0) {
                        reject('验证失败，请重新登录。')
                    } else {
                        resolve(userinfo)
                    }
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        // 获取用户角色以及权限
        getAuth({ commit, state }) {
            let id = state.id
            // console.log(id)
            return new Promise((resolve, reject) => {
                getAuth(id).then(res => {
                    // console.log(res)
                    commit("setRoleAuth", res.rows[0].role)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })

        }
    }
}
export default user