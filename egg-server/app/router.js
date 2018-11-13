'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app

  router.get('/', controller.home.index)

  // vue-sell
  router.get('/api/v1/vue-sell/goods', controller.goods.index)
  router.get('/api/v1/vue-sell/seller', controller.seller.index)
  router.get('/api/v1/vue-sell/ratings', controller.ratings.index)

  // blink
  // router.get('/api/v1/blink/classic', controller.classic.index)
  // router.get('/api/v1/blink/classic/:index', controller.classic.findIndex)
  // router.post('/api/v1/blink/classic', controller.classic.create)
  router.get('/api/v1/blink/classic/:index/next', controller.classic.findNext)
  router.get('/api/v1/blink/classic/:index/previous', controller.classic.findPrevious)
  router.get('/api/v1/blink/classic/:id/:type', controller.classic.findDetail)
  router.resources('classic', '/api/v1/blink/classic', controller.classic)

}
