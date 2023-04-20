import { defineStore } from 'pinia'
import router from '../../router'
import layout from '../../views/Layout/index.vue'
// 第一个参数是应用程序中 store 的唯一 id
export const user = defineStore('users', {
  // 其它配置项
  state: () => {
    return {
      asyncRouter: [], //动态路由
      isRefresh: true, //前置路由判断是否刷新，刷新后需要重新录入路由
    }
  },

  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'asyncRouter',
    // 修改为 sessionStorage，默认为 localStorage
    // storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['asyncRouter'],
  },

  actions: {
    setAsyncRouter(menus: any) {
      console.log('保存动态路由', menus, router)
      this.asyncRouter = menus
      this.handleRoutes(menus)
    },
    handleRoutes(menu: any) {
      this.isRefresh = false //进入后不需要重新获取
      const recurrenceRouter = (childern: any, url: string) => {
        // 引入所有页面，否则找不到页面会报错
        const modules = import.meta.glob('../../views/**/*.vue')
        const childrenArray: any = []
        childern.forEach((i: any) => {
          interface loginFromInt {
            path: string
            name: string
            component: any
          }
          const obj: loginFromInt = {
            path: url + i.url,
            name: i.url,
            component: modules[`../../views${url}${i.url}/index.vue`],
          }
          childrenArray.push(obj)
        })
        return childrenArray
      }

      menu.forEach((i: any) => {
        if (i.children) {
          const res = recurrenceRouter(i.children, i.url)
          router.addRoute({
            path: i.url,
            name: i.url,
            component: layout,
            children: res,
          })
        }
      })
    },
  },
})

export default user
