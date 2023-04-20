import { MockMethod } from 'vite-plugin-mock'

const mock: Array<MockMethod> = [
  {
    // 接口路径
    url: '/api/test',

    // 接口方法
    method: 'get',

    // 返回数据
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: 'Hello World',
      }
    },
  },

  {
    // 接口路径
    url: '/login',
    // 接口方法
    method: 'get',
    // 返回数据
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: {
          access_token: 'a123456',
        },
      }
    },
  },
  {
    url: '/user/menu/all',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          menus: [
            {
              children: [
                {
                  menuId: 2,
                  menuName: '系统用户',
                  parentid: 1,
                  permission: 'userInfo:view',
                  resourceType: 1,
                  sortNum: 1,
                  styleCode: 'icon-xitongyonghuguanli',
                  url: '/systemUser',
                },
                {
                  menuId: 3,
                  menuName: '角色管理',
                  parentid: 1,
                  resourceType: 1,
                  sortNum: 2,
                  styleCode: 'icon-yidongyunkongzhitaiicon45',
                  url: '/roleManagement',
                },
                {
                  menuId: 4,
                  menuName: '菜单管理',
                  parentid: 1,
                  resourceType: 1,
                  sortNum: 3,
                  styleCode: 'icon-xitongguanli-caidanguanli',
                  url: '/menuManagement',
                },
              ],
              menuId: 1,
              menuName: '系统管理',
              parentid: 0,
              permission: 'userInfo:view',
              resourceType: 1,
              sortNum: 0,
              styleCode: 'icon-xitongguanli',
              url: '/sys',
            },
          ],
        },
        msg: '请求成功',
        pageNo: 1,
        pageSize: 10,
        pages: 0,
        totalCount: 0,
      }
    },
  },
]

export default mock
