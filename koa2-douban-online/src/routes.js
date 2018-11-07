import AC from './components/async_load'
import Home from './views/home'
import Detail from './views/movie/detail'
import Login from './views/login'
import Admin from './views/admin'

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: Home
  },
  {
    name: '详情页',
    path: '/detail/:id',
    component: Detail
  },
  {
    name: '类型列表页',
    path: '/list/:type',
    component: Home
  },
  {
    name: '年份列表页',
    path: '/year/:year',
    component: Home
  },
  {
    name: '后台入口',
    icon: 'admin',
    path: '/admin',
    component: Login
  },
  {
    name: '后台列表页面',
    icon: 'admin',
    path: '/admin/list',
    component: Admin
  }
]
