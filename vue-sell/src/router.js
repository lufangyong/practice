import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: 'goods'
  }, {
    path: '/goods',
    name: 'goods',
    component: () =>
      import( /* webpackChunkName: "goods" */ './views/Goods.vue')
  }, {
    path: '/ratings',
    name: 'ratings',
    component: () =>
      import( /* webpackChunkName: "ratings" */ './views/Ratings.vue')
  }, {
    path: '/seller',
    name: 'seller',
    component: () =>
      import( /* webpackChunkName: "seller" */ './views/Seller.vue')
  }]
})