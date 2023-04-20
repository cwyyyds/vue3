import axios from 'axios'
import { getTokenTime } from '@/utils/auth'
// axios对象
const service = axios.create({
  // axios请求基础URL
  // 由于本项目使用mock + vite-plugin-mock启动的mock服务，默认使用的端口号与页面一致
  baseURL: 'http://localhost:8081',
  timeout: 5000,
})

//判断token时间有没有超时
function isTimeOut() {
  const currentTime = Date.now() //当前时间
  const tokenTime = Number(getTokenTime()) //获取记录token创建时间
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

service.interceptors.response.use((res) => {
  return res.data
}) // 响应拦截器

export default service
