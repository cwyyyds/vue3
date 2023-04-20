import Cookies from 'js-cookie'
const TokenKey = 'Token'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token: any) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
//存token时间
export function setTokenTime() {
  Cookies.set('tokenTime', `${Date.now()}`)
}
//获取存入的token时间
export function getTokenTime() {
  return Cookies.get('tokenTime')
}
