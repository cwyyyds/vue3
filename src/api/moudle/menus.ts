import request from '@/utils/request'

export const allMenuList = () =>
  request({ url: 'menus/allMenu', method: 'post' })
