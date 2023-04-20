import { defineStore } from 'pinia'
import { loginOn } from '@/api'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
const logOn = defineStore('logOn', {
  // 其它配置项
  state: () => {
    return {
      token: getToken(),
    }
  },
  actions: {
    async setToken() {
      console.log('登录')
      const { data, msg } = await loginOn()
      this.token = data.access_token
      setToken(data.access_token) //登录的后存储token
      setTokenTime() //存token时间
      console.log('保存成功')
    },
  },
})

export default logOn
