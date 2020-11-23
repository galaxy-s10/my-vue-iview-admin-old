// import { getAuth } from "@/api/auth";
// import { getRoleList } from "../../../api/role";
import { getAuth } from "../../../api/roleauth";
import { login, getUserInfo } from "@/api/user";
import cache from '@/libs/cache'
const user = {
    // 加了命名空间，mutations,actions,getters都要带上模块名
    // （state加不加命名空间都要带模块名）
    namespaced: true,
    state: () => ({
        token: "",
        remember: true,    // 七天免登陆
        role: [],
        auth: [],
        username: "",
        id: "",
        role: "",
        status: "",
        avatar: "",
        title: ""
    }),
    mutations: {
        editRemember(state, payload) {
            // console.log(state, payload)
            state.remember = payload
        },
        setUser(state, payload) {
            const { id, username, role, status, avatar, title } = payload
            state.id = id
            state.username = username
            state.role = role
            state.avatar = avatar
            state.title = title
            state.status = status
        },
        setRole(state, payload) {
            // console.log(payload)
            state.role = payload
        },
        setAuth(state, payload) {
            // console.log(payload)
            state.auth = payload
        },

    },
    actions: {
        login({ state }, userInfo) {
            return new Promise((reslove, reject) => {
                login(userInfo).then(res => {
                    reslove(res)
                }).catch(err => {
                    console.log('errerr')
                    console.log(err)
                    reject(err)
                })
            })
        },
        // 获取用户信息
        getUserInfo({ commit, state }) {
            // let res = cache.getStorageExt('token')
            return new Promise((resolve, reject) => {
                // console.log(state.token)
                getUserInfo(state.token).then(res => {
                    console.log('resresres')
                    console.log(res)
                    const { userInfo } = res
                    commit('setUser', userInfo)
                    if (res.code == 0) {
                        reject('验证失败，请重新登录。')
                    } else {
                        resolve(userInfo)
                    }
                }).catch(err => {
                    console.log('errerrerrerr')
                    console.log(err)
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
                    const { count, rows } = res
                    console.log(res)
                    if (count == 0) {
                        reject({ message: '你没有任何权限！' })
                    } else {
                        let role = []
                        let auth = []
                        rows[0].user.roles.forEach(item => {
                            role.push(item.role_name)
                        });
                        rows[0].user.roles.forEach(item => {
                            item.auths.forEach(val => {
                                auth.push(val.auth_name)
                            })
                        });
                        commit("setRole", role)
                        commit("setAuth", auth)
                        resolve(res)
                    }
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })

        }
    }
}
export default user