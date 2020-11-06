import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
// import Layout from '../views/login'

Vue.use(VueRouter)

// 默认路由
export const defaultRoutes = [{
        name: "admin",
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '控制台',
            icon: 'md-speedometer',
        },
        children: [{
            name: "dashboard",
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {
                title: '控制台',
                icon: 'md-speedometer',
            },
        }, ]
    },
    {
        name: "setting",
        path: '/setting',
        component: Layout,
        meta: {
            title: '设置',
            icon: 'md-speedometer',
        },
        children: [{
                name: "profile",
                path: 'profile',
                component: () => import('@/views/setting/profile'),
                meta: {
                    title: '账号信息',
                    icon: 'md-speedometer',
                },
            },
            {
                name: "security",
                path: 'security',
                component: () => import('@/views/setting/security'),
                meta: {
                    title: '修改密码',
                    icon: 'md-speedometer',
                },
            },
        ]
    },
    {
        name: "home",
        path: '/home',
        redirect: 'login',
        component: Layout,
        meta: {
            title: '首页管理',
            icon: 'md-home',
        },
        children: [{
                name: "register",
                path: 'register',
                component: () => import('@/views/register/index'),
                meta: {
                    title: '注册',
                    icon: 'md-add',
                },
            },
            {
                name: "login",
                path: 'login',
                component: () => import('@/views/login/index'),
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
            title: '报错页面',
            icon: 'md-eye',
        },
        children: [{
                name: "authError",
                path: '401',
                component: () => import('@/views/error/401/index'),
                meta: {
                    title: '权限错误',
                    icon: 'md-speedometer',
                },
            },
            {
                name: "notFound",
                path: '404',
                component: () => import('@/views/error/404/index'),
                meta: {
                    title: '页面未找到',
                    icon: 'md-speedometer',
                },
            },
            {
                name: "serverError",
                path: '500',
                component: () => import('@/views/error/500/index'),
                meta: {
                    title: '服务器错误',
                    icon: 'md-speedometer',
                },
            },
        ]
    },
    // {
    //     name: "pathError",
    //     path: '*',
    //     redirect: '/404',
    // },
]

// 权限路由
export const roleRoutes = [{
        name: "articleManage",
        authKey: ["ARTICLE_LIST", "ADD_ARTICLE", "DELETE_ARTICLE", "SELECT_ARTICLE", "UPDATE_ARTICLE"],
        path: '/articleManage',
        component: Layout,
        meta: {
            title: '文章管理',
            icon: 'md-podium'
        },
        children: [{
                name: "articleList",
                authKey: "ARTICLE_LIST",
                path: 'articleList',
                component: () => import('@/views/articleManage/list/index'),
                meta: {
                    title: '文章列表'
                }
            },
            {

                name: "addArticle",
                authKey: "ADD_ARTICLE",
                path: 'addArticle',
                component: () => import('@/views/articleManage/add/index'),
                meta: {
                    title: '增加文章'
                }
            },
            {
                name: "deleteArticle",
                authKey: "DELETE_ARTICLE",
                path: 'deleteArticle',
                component: () => import('@/views/articleManage/delete/index'),
                meta: {
                    title: '删除文章'
                }
            },

            {

                name: "selectArticle",
                authKey: "SELECT_ARTICLE",
                path: 'selectArticle',
                component: () => import('@/views/articleManage/select/index'),
                meta: {
                    title: '查询文章'
                }
            },
            {

                name: "updateArticle",
                authKey: "UPDATE_ARTICLE",
                path: 'updateArticle',
                component: () => import('@/views/articleManage/update/index'),
                meta: {
                    title: '修改文章'
                }
            },
        ]
    },
    {
        name: "tagManage",
        authKey: ["TAG_LIST", "ADD_TAG", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
        path: '/tagManage',
        component: Layout,
        meta: {
            title: '标签管理',
            icon: 'md-pricetag'
        },
        children: [{
                name: "tagList",
                authKey: "TAG_LIST",
                path: 'tagList',
                component: () => import('@/views/tagManage/list/index'),
                meta: {
                    title: '标签列表'
                }
            },
            {

                name: "addTag",
                authKey: "ADD_TAG",
                path: 'addTag',
                component: () => import('@/views/tagManage/add/index'),
                meta: {
                    title: '添加标签'
                }
            },
            {
                name: "deleteTAG",
                authKey: "DELETE_TAG",
                path: 'deleteTag',
                component: () => import('@/views/tagManage/delete/index'),
                meta: {
                    title: '删除标签'
                }
            },

            {

                name: "selectTAG",
                authKey: "SELECT_TAG",
                path: 'selectTag',
                component: () => import('@/views/tagManage/select/index'),
                meta: {
                    title: '查询标签'
                }
            },
            {

                name: "updateTAG",
                authKey: "UPDATE_TAG",
                path: 'updateTag',
                component: () => import('@/views/tagManage/update/index'),
                meta: {
                    title: '修改标签'
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