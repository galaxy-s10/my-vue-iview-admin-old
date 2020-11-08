import utils from "@/libs/utils";

const app = {
    namespaced: true,
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
            // console.log('vuex')
            // console.log(item);
            // console.log(state.tagOpenPageList);
            state.tagOpenPageList.push(item)
            // utils.oneOf(item,state.tagOpenPageList)
        }
    },
    actions: {

    },

}

export default app