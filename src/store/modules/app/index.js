import utils  from "@/libs/utils";

const app = {
    namespaced:true,
    state: {
        tagOpenPageList:[
            // {
            //     title:'首页',
            //     path:'',
            //     name:'dashboard',
            // },
            // {
            //     title:'文章1',
            //     path:'',
            //     name:'addArticle',
            // },
        ]
    },
    mutations: {
        addTagOpenPage(state,item){
            console.log('vuex')
            console.log(item);
            console.log(state.tagOpenPageList);
            state.tagOpenPageList.push(item)
            // utils.oneOf(item,state.tagOpenPageList)
        }
    },
    actions: {

    },

}

export default app