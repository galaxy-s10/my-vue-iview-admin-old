import utils from "@/libs/utils";

const app = {
    // namespaced: true,
    state: {
        title: 'Vue-iview-admin',
        tagOpenPageList: [
            // {
            //     name: 'dashboard',
            //     meta: {
            //         title: '首页'
            //     },
            // },
        ]
    },
    mutations: {
        addTagOpenPage(state, item) {
            state.tagOpenPageList.push(item)
        }
    },
    actions: {

    },

}

export default app