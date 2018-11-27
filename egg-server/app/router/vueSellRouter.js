const vueSellRouter = function (router, controller) {

  router.get('/api/v1/vue-sell/goods', controller.goods.index)
  router.get('/api/v1/vue-sell/seller', controller.seller.index)
  router.get('/api/v1/vue-sell/ratings', controller.ratings.index)

}

module.exports = vueSellRouter
