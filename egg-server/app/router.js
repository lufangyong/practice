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

  // blink classic
  router.get('/api/v1/blink/classic/latest', controller.classic.findLatest)
  router.get('/api/v1/blink/classic/:index/next', controller.classic.findNext)
  router.get('/api/v1/blink/classic/:index/previous', controller.classic.findPrevious)
  router.get('/api/v1/blink/classic/:id/:type', controller.classic.findDetail)
  router.get('/api/v1/blink/classic/:id/:type/favor', controller.classic.findFavor)
  router.get('/api/v1/blink/classic/favor', controller.classic.findFavorAll)

  // egg 对CRUD封装了一套方法 resources
  // router.get('/api/v1/blink/classic', controller.classic.index)
  // router.get('/api/v1/blink/classic/:id', controller.classic.show)
  // router.post('/api/v1/blink/classic', controller.classic.create)
  // router.put('/api/v1/blink/classic', controller.classic.update)
  router.delete('/api/v1/blink/classic', controller.classic.destroy)
  router.resources('classic', '/api/v1/blink/classic', controller.classic)

  // book like
  router.post('/api/v1/blink/like', controller.classic.like)
  router.post('/api/v1/blink/like/cancel', controller.classic.cancelLike)

  // blink book
  router.get('/api/v1/blink/book/hot_list', controller.book.index)

  router.delete('/api/v1/blink/book', controller.book.destroy)
  router.resources('book', '/api/v1/blink/book', controller.book)

  // book book-detail
  router.resources('bookDetail', '/api/v1/blink/book_detail', controller.bookDetail)

  // blink book-short-comment
  router.put('/api/v1/blink/book_short_comment', controller.bookShortComment.update)
  router.resources('bookShortComment', '/api/v1/blink/book_short_comment', controller.bookShortComment)

  // blink book-hot-keyword
  router.resources('bookHotKeyword', '/api/v1/blink/book_hot_keyword', controller.bookHotKeyword)

}
