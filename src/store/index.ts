import logOn from './moudle/logOn' //用户
import tabBar from './moudle/tabBar' //侧边栏
import user from './moudle/user' //登录

// 统一导出useStore方法
export default function store() {
  return {
    logOnStore: logOn(),
    tabBarStore: tabBar(),
    userStore: user(),
  }
}
