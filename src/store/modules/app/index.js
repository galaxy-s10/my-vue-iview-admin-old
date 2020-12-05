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
        ],
        activeTagOpenPage: ""
    },
    mutations: {
        changeActiveTagOpenPage(state, v) {
            state.activeTagOpenPage = v
        },
        addTagOpenPage(state, item) {
            state.tagOpenPageList.push(item)
        },
        delTagOpenPage(state, name) {
            state.tagOpenPageList.forEach((item, index) => {
                if (item.name == name) {
                    console.log('object');
                    state.tagOpenPageList.splice(index, 1)
                    state.activeTagOpenPage = state.tagOpenPageList[index].name
                }

            })
        }
    },
    actions: {

    },

}

export default app