const user = {
    // 加了命名空间，mutations,actions,getters都要带上模块名
    // （state加不加命名空间都要带模块名）
    // namespaced: true,
    state: () => ({
        user: {
            id:1,
            name:'coderhss'
        }
    }),
    mutations: {

    },
    actions: {
        login(state, payload) {
            console.log(state)
            console.log(payload)
        }
    }
}
export default user