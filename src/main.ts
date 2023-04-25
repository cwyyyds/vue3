import { createApp } from 'vue'
import '@/router/permission'
import App from './App.vue'
import router from './router'

import './assets/iconfont/iconfont.css'

import 'element-plus/theme-chalk/el-message.css'
import '@/styles/app.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//引入组件
import components from '@/components/index.js'

const app = createApp(App)

// 统一注册组件
app.use(components)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router).use(pinia)
// https://blog.csdn.net/Jone_hui/article/details/123041404
router.isReady().then(() => app.mount('#app'))
