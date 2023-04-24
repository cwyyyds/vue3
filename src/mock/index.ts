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
    url: '/menus/allMenu',
    method: 'post',
    // 返回数据
    response: () => {
      return {
        code: 0,
        data: [
          {
            children: [
              {
                menuId: 2,
                menuName: '系统用户',
                menuTree: '0.1.2',
                parentid: 1,
                permission: 'userInfo:view',
                sortNum: 1,
                styleCode: 'el-icon-user',
                url: 'user',
              },
              {
                menuId: 3,
                menuName: '角色管理',
                menuTree: '',
                parentid: 1,
                permission: '',
                sortNum: 2,
                styleCode: 'el-icon-finished',
                url: 'role',
              },
              {
                menuId: 4,
                menuName: '菜单管理',
                menuTree: '',
                parentid: 1,
                permission: '',
                sortNum: 3,
                styleCode: 'el-icon-s-operation',
                url: 'menu',
              },
              {
                menuId: 32,
                menuName: '日志查看',
                menuTree: '',
                parentid: 1,
                permission: '',
                sortNum: 50,
                styleCode: 'table',
                url: 'log',
              },
            ],
            menuId: 1,
            menuName: '系统管理',
            menuTree: '0.1',
            parentid: 0,
            permission: 'userInfo:view',
            sortNum: 0,
            styleCode: 'el-icon-setting',
            url: '/sys',
          },
          {
            children: [
              {
                menuId: 25,
                menuName: '街道管理',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 1,
                styleCode: 'kt-icon-icon_xinyong_xianxing_jijin-289',
                url: 'manage',
              },
              {
                menuId: 26,
                menuName: '标签设置',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 3,
                styleCode: 'kt-icon-biaoqian1',
                url: 'label',
              },
              {
                menuId: 27,
                menuName: '景点类型',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 2,
                styleCode: 'kt-icon-type',
                url: 'pointTypes',
              },
              {
                menuId: 28,
                menuName: '线路设置',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 50,
                styleCode: 'kt-icon-dituleixianlu',
                url: 'line',
              },
              {
                menuId: 29,
                menuName: '景点点位',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 50,
                styleCode: 'kt-icon-dianweizongshu',
                url: 'point',
              },
              {
                menuId: 31,
                menuName: '线路景点',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 5,
                styleCode: 'kt-icon-xianlu',
                url: 'linePoint',
              },
              {
                menuId: 33,
                menuName: '景区设置',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 50,
                styleCode: 'kt-icon-jingqu',
                url: 'scenic',
              },
              {
                menuId: 34,
                menuName: '排序设置',
                menuTree: '',
                parentid: 24,
                permission: '',
                sortNum: 50,
                styleCode: 'kt-icon-paixu',
                url: 'sort',
              },
            ],
            menuId: 24,
            menuName: '基础数据',
            menuTree: '',
            parentid: 0,
            permission: '',
            sortNum: 1,
            styleCode: 'el-icon-data-analysis',
            url: '/baseData',
          },
        ],
        msg: '请求成功',
        pageNo: 1,
        pageSize: 10,
        pages: 0,
        totalCount: 0,
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
