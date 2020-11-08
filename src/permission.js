import router from './router'
import store from './store'
import { defaultRoutes } from './router/router'

const whiteList = [] // no redirect whitelist

console.log(defaultRoutes)
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
  console.log('to', to)
  console.log('from', from)
  console.log(whiteList.indexOf(to.path))
  if (whiteList.indexOf(to.path) == -1) {
    console.log('nonono')
    next({ path: '/login', query: { redirect: to.path } })
  } else {
    console.log('okkk')
    next()
  }
  // next()
})

router.afterEach(() => {
  console.log('afterEach')
})
