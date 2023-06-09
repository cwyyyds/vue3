import router from './index'
// 导入 pinia 实例
import store from '@/store'

const whiteList = ['/login', '/404'] //白名单
router.beforeEach(async (to, from, next) => {
  const { logOnStore } = store()
  const token = logOnStore.token
  if (token) {
    console.log(logOnStore.isRefresh, token)
    if (logOnStore.isRefresh) {
      // 刷新后需要重新添加路由
      await logOnStore.handleRoutes(logOnStore.asyncRouter)
      // 这个重定向非常重要，否则跳转不生效
      next({
        path: to.path, // 动态添加一个新的路由
        replace: true, // 重定向,为了让刚刚添加的路由规则生效
      })
      return
    }
    // 是否进入登录页
    to.path === '/login'
      ? //  是 跳到首页
        next('/')
      : // 不是 直接进入
        next()
  } else {
    // 未登录 访问的是否在白名单(未登录也能访问的页面)
    const isCludes = whiteList.includes(to.path)
    isCludes
      ? // 在白名单 放行
        next()
      : // 不在白名单(不登录不能访问) 跳到登录页
        next('/login')
  }
})
