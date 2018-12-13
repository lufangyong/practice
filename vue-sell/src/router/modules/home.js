export default [
  {
    path: '/',
    redirect: 'goods'
  }, {
    path: '/goods',
    name: 'goods',
    component: () =>
      import( /* webpackChunkName: "goods" */ '@/views/Goods.vue')
  }, {
    path: '/ratings',
    name: 'ratings',
    component: () =>
      import( /* webpackChunkName: "ratings" */ '@/views/Ratings.vue')
  }, {
    path: '/seller',
    name: 'seller',
    component: () =>
      import( /* webpackChunkName: "seller" */ '@/views/Seller.vue')
  }
]
