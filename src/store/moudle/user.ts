import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
export const user = defineStore('users', {
  // 其它配置项
  state: () => {
    return {}
  },

  actions: {},
})

export default user
