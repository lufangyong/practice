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
  router.get('/api/v1/blink/classic/latest', controller.classic.findLatest)
  router.get('/api/v1/blink/classic/:index/next', controller.classic.findNext)
  router.get('/api/v1/blink/classic/:index/previous', controller.classic.findPrevious)
  router.get('/api/v1/blink/classic/:id/:type', controller.classic.findDetail)
  router.get('/api/v1/blink/classic/:id/:type/favor', controller.classic.findFavor)
  router.get('/api/v1/blink/classic/favor', controller.classic.findFavorAll)

  // router.get('/api/v1/blink/classic', controller.classic.index)
  // router.get('/api/v1/blink/classic/:index', controller.classic.show)
  // router.post('/api/v1/blink/classic', controller.classic.create)
  // router.put('/api/v1/blink/classic', controller.classic.update)
  router.delete('/api/v1/blink/classic', controller.classic.destroy)
  router.resources('classic', '/api/v1/blink/classic', controller.classic)

  router.post('/api/v1/blink/like', controller.classic.like)
  router.post('/api/v1/blink/like/cancel', controller.classic.cancelLike)


}
