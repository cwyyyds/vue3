import req from '../../utils/request'

/**
 * 测试接口
 */

// 测试用Hello World

export const loginOn = () => req({ url: '/login', method: 'get' })

export const getMenu = () => req({ url: '/user/menu/all', method: 'get' })
