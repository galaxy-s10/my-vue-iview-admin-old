import router from './router'
import store from './store'
import cache from './libs/cache'
import { defaultRoutes } from './router/router'


const whiteList = []
defaultRoutes.forEach(item => {
  if (whiteList.indexOf(item.path) == -1) {
    whiteList.push(item.path)
  }
  if (item.children) {
    item.children.forEach(iten => {
      if (whiteList.indexOf(iten.path) == -1) {
        whiteList.push(iten.path)
      }
    })
  }
})

// console.log('白名单')
// console.log(whiteList)

router.beforeEach(async (to, from, next) => {
  const hasToken = cache.getStorageExt("token")
  if (hasToken) {
    const hasUserInfo = store.state.user
    // 判断用户有没有登录
    if (hasUserInfo.username) {
      // console.log(whiteList)
      // console.log(to.path)
      if (whiteList.indexOf(to.path) == -1) {
        // console.log('不在白名单，判断有无对应权限，没有就跳转登录页面')
        const allAuths = []
        hasUserInfo.roleAuth.auths.forEach(item => {
          allAuths.push(item.auth_name)
        })
        if (allAuths.includes(to.meta.authKey)) {
          next()
        } else {
          next({ name: "authError", params: { msg: to.meta.title } })
        }
      } else {
        // console.log('在白名单，直接跳转')
        next()
      }
    } else {
      // console.log('没登录')
      try {
        await store.dispatch("user/getUserInfo")
        await store.dispatch("user/getAuth")
        next({ path: to.path })
        next()
      } catch (err) {
        console.log(err)
        console.log(to)
        cache.clearStorage("token")
        next(`/login?direct=${to.path}`)
      }



    }
  } else {
    if (to.path != '/login') {
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // console.log('afterEach')
})
