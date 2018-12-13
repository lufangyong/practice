import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './modules' // 引入业务逻辑模块
import CommonRouters from './common' // 引入通用模块

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',// 需要服务端支持
  base: '/', // 应用的基路径
  scrollBehavior: () => ({y: 0}),
  routes: RouterConfig.concat(CommonRouters)
})
