import { defineStore } from 'pinia'
import { loginOn } from '@/api'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
const logOn = defineStore('logOn', {
  // 开启数据持久化
  persist: true,
  // 其它配置项
  state: () => {
    return {
      token: '',
    }
  },
  actions: {
    async setToken() {
      const { data, msg } = await loginOn()
      this.token = data.access_token
      setToken(data.access_token) //登录的后存储token
      setTokenTime() //存token时间
    },
  },
})

export default logOn
