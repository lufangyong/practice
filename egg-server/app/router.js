'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/', controller.home.index)

  // vue-sell
  router.get('/api/v1/vue-sell/goods', controller.goods.index)
  router.get('/api/v1/vue-sell/seller', controller.seller.index)
  router.get('/api/v1/vue-sell/ratings', controller.ratings.index)

}
