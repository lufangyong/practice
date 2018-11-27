'use strict';

const vueSellRouter = require('./router/vueSellRouter')
const blinkRouter = require('./router/blinkRouter')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app

  router.get('/', controller.home.index)

  // vue-sell
  vueSellRouter(router, controller)

  // blink
  blinkRouter(router, controller)

}
