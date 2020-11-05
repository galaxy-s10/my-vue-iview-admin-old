import utils  from "@/libs/utils";

const app = {
    namespaced:true,
    state: {
        tagOpenPageList:[
            {
                title:'首页',
                path:'',
                name:'dashboard',
            },
            {
                title:'文章1',
                path:'',
                name:'adf',
            },
        ]
    },
    mutations: {
        addTagOpenPage(state,item){
            utils.oneOf(state.addTagOpenPage)
        }
    },
    actions: {

    },

}

export default app