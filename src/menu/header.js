// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '事件审查',
    icon: 'gear',
    children: [
      { path: '/admin-event/deal', title: '事件处理', icon: 'history' },
      { path: '/admin-event/query', title: '事件查询', icon: 'search' }

    ]
  },
  {
    title: '后台管理',
    icon: 'users',
    children: [
      { path: '/admin-manager/user', title: '用户管理', icon: 'user' },
      { path: '/admin-manager/sensor', title: '传感器管理', icon: 'podcast' },
      { path: '/admin-manager/section', title: '路段管理', icon: 'road' },
      { path: '/admin-manager/pc', title: '工控机管理', icon: 'desktop' }

    ]
  }

]
