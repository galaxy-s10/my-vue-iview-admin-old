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
            console.log(item);
            console.log(state.tagOpenPageList);
            utils.oneOf(item,state.tagOpenPageList)
        }
    },
    actions: {

    },

}

export default app