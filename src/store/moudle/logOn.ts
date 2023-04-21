import { defineStore } from 'pinia'
import { loginOn } from '@/api'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
import router from '../../router'
import layout from '../../views/Layout/index.vue'
import { ElMessage } from 'element-plus'
const logOn = defineStore('logOn', {
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'asyncRouter',
    // 修改为 sessionStorage，默认为 localStorage
    // storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['asyncRouter'],
  },
  // 其它配置项
  state: () => {
    return {
      token: getToken(), //浏览器关闭后重进需要重新录入
      asyncRouter: [], //动态路由
      isRefresh: true, //前置路由判断是否刷新，刷新后需要重新录入路由
    }
  },
  actions: {
    // 登录
    async logOn() {
      console.log('登录')
      const { data, msg } = await loginOn()
      this.token = data.access_token
      setToken(data.access_token) //登录的后存储token
      setTokenTime() //存token时间
      console.log('保存成功')
    },

    // 退出
    quitOn() {
      this.token = ''
      this.asyncRouter = []
      removeToken()
      router.push('/login')
      ElMessage.success('退出成功')
    },

    // 获取路由信息
    setAsyncRouter(menus: any) {
      console.log('保存动态路由', menus, router)
      this.asyncRouter = menus
      this.handleRoutes(menus)
    },

    // 处理路由信息
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

export default logOn
