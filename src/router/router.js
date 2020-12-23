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
            icon: 'ios-speedometer-outline',
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
            icon: 'ios-home-outline',
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
            icon: 'ios-eye-outline',
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
            icon: 'ios-settings-outline',
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
        path: '/debug',
        name: 'debug',
        meta: {
            title: 'Debug',
            icon: 'ios-bug-outline'
        },
        // redirect: '/debugs',
        component: Layout,
        children: [
            {
                name: "debugs",
                path: '/debugs',
                component: () => import('@/views/debug/index'),
                meta: {
                    title: '调试页面1',
                    icon: 'ios-bug-outline',
                },
            },
        ]
    },
    {
        path: '/login',
        name: 'adminlogin',
        hidden:true,
        meta: {
            title: '后台登录',
            icon: 'md-lock'
        },
        component: () => import('@/views/login/index'),
    },

]

// 权限路由
export const roleRoutes = [{
    name: "articleManage",
    authKey: ["ARTICLE_LIST", "ADD_ARTICLE", "DELETE_ARTICLE", "SELECT_ARTICLE", "UPDATE_ARTICLE"],
    path: '/articleManage',
    component: Layout,
    redirect: '/articleManage/articleList',
    meta: {
        title: '文章管理',
        icon: 'ios-podium-outline',
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
        hidden:true,
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
    name: "commentManage",
    authKey: ["COMMENT_LIST", "ADD_COMMENT", "DELETE_COMMENT", "SELECT_COMMENT", "UPDATE_COMMENT"],
    path: '/commentManage',
    component: Layout,
    redirect: '/commentManage/commentList',
    meta: {
        title: '留言管理',
        icon: 'ios-chatbubbles-outline',
        authKey: ["COMMENT_LIST", "ADD_COMMENT", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
    },
    children: [{
        name: "commentList",
        authKey: "COMMENT_LIST",
        path: '/commentManage/commentList',
        component: () => import('@/views/commentManage/list/index'),
        meta: {
            title: '留言列表',
            authKey: "COMMENT_LIST",
        }
    },
    {

        name: "addComment",
        authKey: "ADD_COMMENT",
        path: '/commentManage/addComment',
        component: () => import('@/views/commentManage/add/index'),
        meta: {
            title: '添加留言',
            authKey: "ADD_COMMENT",
        }
    },
    {
        name: "deleteComment",
        authKey: "DELETE_COMMENT",
        hidden:true,
        path: '/commentManage/deleteComment',
        component: () => import('@/views/commentManage/delete/index'),
        meta: {
            title: '删除留言',
            authKey: "DELETE_COMMENT",
        }
    },

    {

        name: "selectComment",
        authKey: "SELECT_COMMENT",
        path: '/commentManage/selectComment',
        component: () => import('@/views/commentManage/select/index'),
        meta: {
            title: '查询留言',
            authKey: "SELECT_COMMENT",
        }
    },
    {

        name: "updateComment",
        authKey: "UPDATE_COMMENT",
        path: '/commentManage/updateComment',
        component: () => import('@/views/commentManage/update/index'),
        meta: {
            title: '修改标签',
            authKey: "UPDATE_COMMENT",
        }
    },
    ]
},
{
    name: "tagManage",
    authKey: ["TAG_LIST", "ADD_TAG", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
    path: '/tagManage',
    component: Layout,
    redirect: '/tagManage/tagList',
    meta: {
        title: '标签管理',
        icon: 'ios-pricetags-outline',
        authKey: ["TAG_LIST", "ADD_TAG", "DELETE_TAG", "SELECT_TAG", "UPDATE_TAG"],
    },
    children: [{
        name: "tagList",
        authKey: "TAG_LIST",
        path: '/tagManage/tagList',
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
        hidden:true,
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
{
    name: "linkManage",
    authKey: ["LINK_LIST", "ADD_LINK", "DELETE_LINK", "SELECT_LINK", "UPDATE_LINK"],
    path: '/linkManage',
    component: Layout,
    redirect: '/linkManage/linkList',
    meta: {
        title: '友链管理',
        icon: 'ios-link-outline',
        authKey: ["LINK_LIST", "ADD_LINK", "DELETE_LINK", "SELECT_LINK", "UPDATE_LINK"],
    },
    children: [{
        name: "linkList",
        authKey: "LINK_LIST",
        path: '/linkManage/linkList',
        component: () => import('@/views/linkManage/list/index'),
        meta: {
            title: '友链列表',
            authKey: "LINK_LIST",
        }
    },
    {

        name: "addLink",
        authKey: "ADD_LINK",
        path: '/linkManage/addLink',
        component: () => import('@/views/linkManage/add/index'),
        meta: {
            title: '添加友链',
            authKey: "ADD_LINK",
        }
    },
    {
        name: "deleteLink",
        authKey: "DELETE_LINK",
        hidden:true,
        path: '/linkManage/deleteLink',
        component: () => import('@/views/linkManage/delete/index'),
        meta: {
            title: '删除友链',
            authKey: "DELETE_LINK",
        }
    },

    {

        name: "selectLink",
        authKey: "SELECT_LINK",
        path: '/linkManage/selectLink',
        component: () => import('@/views/linkManage/select/index'),
        meta: {
            title: '查询友链',
            authKey: "SELECT_LINK",
        }
    },
    {

        name: "updateLink",
        authKey: "UPDATE_LINK",
        path: '/linkManage/updateLink',
        component: () => import('@/views/linkManage/update/index'),
        meta: {
            title: '修改标签',
            authKey: "UPDATE_LINK",
        }
    },
    ]
},
{
    name: "authManage",
    authKey: [
        "AUTH_LIST", "ADD_AUTH", "DELETE_AUTH", "SELECT_AUTH", "UPDATE_AUTH",
        "ROLE_LIST", "ADD_ROLE", "DELETE_ROLE", "SELECT_ROLE", "UPDATE_ROLE",
        "USER_LIST", "ADD_USER", "DELETE_USER", "SELECT_USER", "UPDATE_USER",
        "AUTH_MANAGE", "ROLE_MANAGE", "USER_MANAGE"
    ],
    path: '/authManage',
    component: Layout,
    redirect: '/authManage/authList',
    meta: {
        title: '权限管理',
        icon: 'ios-lock-outline',
        authKey: [
            "AUTH_LIST", "ADD_AUTH", "DELETE_AUTH", "SELECT_AUTH", "UPDATE_AUTH",
            "ROLE_LIST", "ADD_ROLE", "DELETE_ROLE", "SELECT_ROLE", "UPDATE_ROLE",
            "USER_LIST", "ADD_USER", "DELETE_USER", "SELECT_USER", "UPDATE_USER",
            "AUTH_MANAGE", "ROLE_MANAGE", "USER_MANAGE"
        ],
    },
    children: [
        {
            name: "userList",
            authKey: "USER_LIST",
            path: '/userManage/userList',
            component: () => import('@/views/userManage/list/index'),
            meta: {
                title: '用户管理',
                authKey: "USER_LIST",
            }
        },
        {
            name: "roleList",
            authKey: "ROLE_LIST",
            path: '/roleManage/roleList',
            component: () => import('@/views/roleManage/list/index'),
            meta: {
                title: '角色管理',
                authKey: "ROLE_LIST",
            }
        },
        {
            name: "authList",
            authKey: "AUTH_LIST",
            path: '/authManage/authList',
            component: () => import('@/views/authManage/list/index'),
            meta: {
                title: '权限管理',
                authKey: "AUTH_LIST",
            }
        },
    ]
},
{
    name: "logManage",
    authKey: ["LOG_LIST", 'LOG_MANAGE'],
    path: '/logManage',
    component: Layout,
    redirect: '/logManage/logList',
    meta: {
        title: '日志管理',
        icon: 'ios-paw-outline',
        authKey: ["LOG_LIST", "ADD_AUTH", "DELETE_AUTH", "SELECT_AUTH", "UPDATE_AUTH"],
    },
    children: [
        {
            name: "logList",
            authKey: "LOG_LIST",
            path: '/logManage/logList',
            component: () => import('@/views/logManage/list/index'),
            meta: {
                title: '日志列表',
                authKey: "LOG_LIST",
            }
        }
    ]
},
    // {
    //     name: "authManage",
    //     authKey: ["AUTH_LIST", "ADD_AUTH", "DELETE_AUTH", "SELECT_AUTH", "UPDATE_AUTH"],
    //     path: '/authManage',
    //     component: Layout,
    //     redirect: '/authManage/authList',
    //     meta: {
    //         title: '权限管理',
    //         icon: 'md-lock',
    //         authKey: ["AUTH_LIST", "ADD_AUTH", "DELETE_AUTH", "SELECT_AUTH", "UPDATE_AUTH"],
    //     },
    //     children: [{
    //         name: "authList",
    //         authKey: "AUTH_LIST",
    //         path: '/authManage/authList',
    //         component: () => import('@/views/authManage/list/index'),
    //         meta: {
    //             title: '权限列表',
    //             authKey: "AUTH_LIST",
    //         }
    //     },
    //     {

    //         name: "addAuth",
    //         authKey: "ADD_AUTH",
    //         path: '/authManage/addAuth',
    //         component: () => import('@/views/authManage/add/index'),
    //         meta: {
    //             title: '添加标签',
    //             authKey: "ADD_AUTH",
    //         }
    //     },
    //     {
    //         name: "deleteAuth",
    //         authKey: "DELETE_AUTH",
    //         path: '/authManage/deleteAuth',
    //         component: () => import('@/views/authManage/delete/index'),
    //         meta: {
    //             title: '删除标签',
    //             authKey: "DELETE_AUTH",
    //         }
    //     },

    //     {

    //         name: "selectAuth",
    //         authKey: "SELECT_AUTH",
    //         path: '/authManage/selectAuth',
    //         component: () => import('@/views/authManage/select/index'),
    //         meta: {
    //             title: '查询权限',
    //             authKey: "SELECT_AUTH",
    //         }
    //     },
    //     {

    //         name: "updateAuth",
    //         authKey: "UPDATE_AUTH",
    //         path: '/authManage/updateAuth',
    //         component: () => import('@/views/authManage/update/index'),
    //         meta: {
    //             title: '修改权限',
    //             authKey: "UPDATE_AUTH",
    //         }
    //     },
    //     ]
    // },


]

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...defaultRoutes,
        ...roleRoutes
    ]
})


export default router