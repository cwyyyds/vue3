import { defineStore } from 'pinia'

const tabBar = defineStore('tabBarArray', {
  // 其它配置项
  state: () => {
    return {
      tabBarArray: new Array<{ path: string; name: string }>(),
      showTabBar: '', //标签页展示样式
      menuIndex: 1, //当前菜单index
      showMenu: '/homePage', //当前展示的菜单
    }
  },

  // 开启数据持久化
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'tabBar',
    // 修改为 sessionStorage，默认为 localStorage
    // storage: sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['tabBarArray', 'showTabBar', 'menuIndex', 'showMenu'],
  },

  actions: {
    // 数据重置
    resetting() {
      this.tabBarArray = new Array<{ path: string; name: string }>()
      this.showTabBar = ''
      this.menuIndex = 1
      this.showMenu = '/homePage'
    },

    // 保存选中路由
    setTabBar(path: string, name: string) {
      const index = this.tabBarArray.findIndex((item) => {
        return item.path === path
      })
      if (index === -1) {
        const obj = {
          path,
          name,
        }
        this.tabBarArray.push(obj)
      }
      this.showTabBar = name //当前选中的路由
      this.showMenu = path
      console.log(this.showTabBar)
    },

    // 关闭选中项
    closeFn(name: string): number {
      let number = 0
      let isShowTabBar = false
      const index = this.tabBarArray.findIndex((item) => {
        if (item.name == name) {
          //找到删除点击的一项
          if (this.showTabBar === name) isShowTabBar = true //删除的一项正好是当前显示项，做记录
        }
        return item.name == name
      })

      if (index !== -1) {
        if (isShowTabBar) {
          //删除项是当前展示项的时候
          if (index == 0) {
            this.showTabBar =
              this.tabBarArray[`${this.tabBarArray.length - 1}`].name //删除的项位于第一个位置的时候，样式会转移到最后一位
            this.showMenu =
              this.tabBarArray[`${this.tabBarArray.length - 1}`].path
            number = this.tabBarArray.length - 2 //长度比索引大一，去除一项后又要减一，所以减二
          } else {
            this.showTabBar = this.tabBarArray[`${index - 1}`].name //其他情况删除的时候样式会到前面一位
            this.showMenu = this.tabBarArray[`${index - 1}`].path
            number = index - 1
          }
        }
        this.tabBarArray.splice(index, 1)
      }
      return number
    },
  },
})

export default tabBar
