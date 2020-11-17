import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
// import Layout from '../views/login'

Vue.use(VueRouter)

// 默认路由
export const defaultRoutes = [
    {
        name: "admin",
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '首页',
            icon: 'md-speedometer',
        },
        children: [{
            name: "dashboard",
            path: '/dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {
                title: '控制台',
                icon: 'md-speedometer',
            },
        },
            // {
            //     name: 'login',
            //     path: '/login',
            //     meta: {
            //         title: '登录',
            //         icon: 'md-speedometer',
            //     },
            //     component: () => import('@/views/login/index'),
            // },
        ]
    },
    {
        name: "home",
        path: '/home',
        redirect: '/home/register',
        component: Layout,
        meta: {
            title: '前台管理',
            icon: 'md-home',
        },
        children: [{
            name: "register",
            path: '/home/register',
            component: () => import('@/views/home/register/index'),
            meta: {
                title: '注册',
                icon: 'md-add',
            },
        },
        {
            name: "login",
            path: '/home/login',
            component: () => import('@/views/home/login/index'),
            meta: {
                title: '登录',
                icon: 'ios-add',
            },
        },
        ]
    },
    {
        name: "error",
        path: '*',
        component: Layout,
        redirect: '/404',
        meta: {
            title: '异常页面',
            icon: 'md-eye',
        },
        children: [{
            name: "authError",
            path: '/401',
            component: () => import('@/views/error/401/index'),
            meta: {
                title: '权限错误',
                icon: 'md-speedometer',
            },
        },
        {
            name: "notFound",
            path: '/404',
            component: () => import('@/views/error/404/index'),
            meta: {
                title: '页面不存在',
                icon: 'md-speedometer',
            },
        },
        {
            name: "serverError",
            path: '/500',
            component: () => import('@/views/error/500/index'),
            meta: {
                title: '服务器错误',
                icon: 'md-speedometer',
            },
        },
        ]
    },
    {
        name: "setting",
        path: '/setting',
        component: Layout,
        redirect: '/setting/profile',
        meta: {
            title: '设置',
            icon: 'md-speedometer',
        },
        children: [{
            name: "profile",
            path: '/setting/profile',
            component: () => import('@/views/setting/profile'),
            meta: {
                title: '账号信息',
                icon: 'md-speedometer',
            },
        },
        {
            name: "security",
            path: '/setting/security',
            component: () => import('@/views/setting/security'),
            meta: {
                title: '修改密码',
                icon: 'md-speedometer',
            },
        },
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
    },
]

// 权限路由
export const roleRoutes = [{
    name: "articleManage",
    authKey: ["ARTICLE_LIST", "ADD_ARTICLE", "DELETE_ARTICLE", "SELECT_ARTICLE", "UPDATE_ARTICLE"],
    path: '/articleManage',
    component: Layout,
    // redirect: '/articleManage/articleList',
    meta: {
        title: '文章管理',
        icon: 'md-podium',
        authKey: ["ARTICLE_LIST", "ADD_ARTICLE", "DELETE_ARTICLE", "SELECT_ARTICLE", "UPDATE_ARTICLE"],
    },
    children: [{
        name: "articleList",
        authKey: "ARTICLE_LIST",
        path: '/articleManage/articleList',
        component: () => import('@/views/articleManage/list/index'),
        meta: {
            title: '文章列表',
            authKey: "ARTICLE_LIST",
        }
    },
    {

        name: "addArticle",
        authKey: "ADD_ARTICLE",
        path: '/articleManage/addArticle',
        component: () => import('@/views/articleManage/add/index'),
        meta: {
            title: '增加文章',
            authKey: "ADD_ARTICLE",
        }
    },
    {
        name: "deleteArticle",
        authKey: "DELETE_ARTICLE",
        path: '/articleManage/deleteArticle',
        component: () => import('@/views/articleManage/delete/index'),
        meta: {
            title: '删除文章',
            authKey: "DELETE_ARTICLE",
        }
    },

    {

        name: "selectArticle",
        authKey: "SELECT_ARTICLE",
        path: '/articleManage/selectArticle',
        component: () => import('@/views/articleManage/select/index'),
        meta: {
            title: '查询文章',
            authKey: "SELECT_ARTICLE",
        }
    },
    {

        name: "updateArticle",
        authKey: "UPDATE_ARTICLE",
        path: '/articleManage/updateArticle',
        component: () => import('@/views/articleManage/update/index'),
        meta: {
            title: '修改文章',
            authKey: "UPDATE_ARTICLE",
        }
    },
    ]
},
{
    name: "tagManage",
    authKey: ["TAG_LIST", "ADD_TAG", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
    path: '/tagManage//tagManage',
    component: Layout,
    redirect: '/tagManage/tagList',
    meta: {
        title: '标签管理',
        icon: 'md-pricetag',
        authKey: ["TAG_LIST", "ADD_TAG", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
    },
    children: [{
        name: "tagList",
        authKey: "TAG_LIST",
        path: '/tagManage//tagManage/tagList',
        component: () => import('@/views/tagManage/list/index'),
        meta: {
            title: '标签列表',
            authKey: "TAG_LIST",
        }
    },
    {

        name: "addTag",
        authKey: "ADD_TAG",
        path: '/tagManage/addTag',
        component: () => import('@/views/tagManage/add/index'),
        meta: {
            title: '添加标签',
            authKey: "ADD_TAG",
        }
    },
    {
        name: "deleteTAG",
        authKey: "DELETE_TAG",
        path: '/tagManage/deleteTag',
        component: () => import('@/views/tagManage/delete/index'),
        meta: {
            title: '删除标签',
            authKey: "DELETE_TAG",
        }
    },

    {

        name: "selectTAG",
        authKey: "SELECT_TAG",
        path: '/tagManage/selectTag',
        component: () => import('@/views/tagManage/select/index'),
        meta: {
            title: '查询标签',
            authKey: "SELECT_TAG",
        }
    },
    {

        name: "updateTAG",
        authKey: "UPDATE_TAG",
        path: '/tagManage/updateTag',
        component: () => import('@/views/tagManage/update/index'),
        meta: {
            title: '修改标签',
            authKey: "UPDATE_TAG",
        }
    },
    ]
},

]

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...defaultRoutes,
        ...roleRoutes
    ]
})


export default router