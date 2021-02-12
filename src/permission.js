import router from './router'
import store from './store'
import cache from './libs/cache'
import {
  defaultRoutes
} from './router/router'


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

// 比较两数组是否有交集(返回true代表有交集)
function hasMixin(a, b) {
  return a.length + b.length !== new Set([...a, ...b]).size
}
router.beforeEach(async (to, from, next) => {
  const hasToken = cache.getStorageExt("token")
  if (hasToken) {
    const hasUserInfo = store.state.user
    // 判断用户有没有登录
    if (hasUserInfo.username) {
      next()
    } else {
      try {
        await store.dispatch("user/getUserInfo")
        await store.dispatch("user/getAuth")
        store.dispatch("user/generateRoutes");
        next(to)
      } catch (err) {
        cache.clearStorage("token")
        next(`/login?direct=${to.path}`)
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
    // if (whiteList.indexOf(to.path) != -1) {
    //   next()
    // } else {
    //   next(`/login?redirect=${to.path}`)
    // }
  }
})



router.afterEach(() => {
  // console.log('afterEach')
})