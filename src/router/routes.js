import demo from './modules/demo'

import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: () => import('@/pages/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      {
        path: '/admin-event/deal',
        name: 'admin-event-deal',
        component: () => import('@/pages/admin-event/deal'),
        meta: {
          auth: true,
          title: '事件处理'
        }
      },
      {
        path: '/admin-event/query',
        name: 'admin-event-query',
        component: () => import('@/pages/admin-event/query'),
        meta: {
          auth: true,
          title: '事件查询'
        }
      },
      {
        path: '/admin-manager/pc',
        name: 'admin-manager-pc',
        component: () => import('@/pages/admin-manager/pc'),
        meta: {
          auth: true,
          title: '工控机管理'
        }
      },
      {
        path: '/admin-manager/sensor',
        name: 'admin-manager-sensor',
        component: () => import('@/pages/admin-manager/sensor'),
        meta: {
          auth: true,
          title: '传感器管理'
        }
      },
      {
        path: '/admin-manager/section',
        name: 'admin-manager-section',
        component: () => import('@/pages/admin-manager/section'),
        meta: {
          auth: true,
          title: '路段管理'
        }
      },
      {
        path: '/admin-manager/user',
        name: 'admin-manager-user',
        component: () => import('@/pages/admin-manager/user'),
        meta: {
          auth: true,
          title: '用户管理'
        }
      }
    ]
  },
  demo
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
