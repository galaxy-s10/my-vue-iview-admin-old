import router from './router'
import store from './store'
import cache from './libs/cache'
import { defaultRoutes } from './router/router'

// console.log(cache.getStorageExt("token"))

// console.log('store.state.user.roleAuth')
// console.log(store.state.user.roleAuth)

const whiteList = []

// console.log(defaultRoutes)
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

console.log('白名单')
console.log(whiteList)

router.beforeEach(async (to, from, next) => {
  console.log(to)
  // console.log(from)
  const hasToken = cache.getStorageExt("token")
  // console.log(hasToken, 111)
  if (hasToken) {
    // console.log('hasToken')
    // console.log(store.state.user.username)
    const hasUserInfo = store.state.user
    // 判断用户有没有登录
    if (hasUserInfo.username) {
      console.log('登录了')
      console.log(whiteList)
      console.log(to.path)
      if (whiteList.indexOf(to.path) == -1) {
        // console.log('不在白名单，判断有无对应权限，没有就跳转登录页面')
        const allAuths = []
        hasUserInfo.roleAuth.auths.forEach(item => {
          allAuths.push(item.auth_name)
        })
        console.log(allAuths)
        console.log(to.meta.authKey)
        if (allAuths.includes(to.meta.authKey)) {
          console.log('object')
          next()
        } else {
          next({ name: "authError", params: { msg: to.meta.title } })
        }
      } else {
        console.log('在白名单，直接跳转')
        next()
      }
    } else {
      console.log('没登录')
      await store.dispatch("user/getUserInfo")
      await store.dispatch("user/getAuth")

      next({ path: to.path })
      console.log('PPPPP')
      next()
      console.log("QQQQQ")
    }
  } else {
    // console.log(to)
    // console.log(to.path)
    if (to.path != '/login') {
      // next({ path: '/login' })
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // console.log('afterEach')
})
