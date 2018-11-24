import {
  HTTP
}
from '../utils/http-p'

class BookModel extends HTTP {

  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }

  getDetail(bid) {
    return this.request({
      url: `/book_detail/${bid}`
    })
  }

  getComments(bid) {
    return this.request({
      url: `/book_short_comment/${bid}`
    })
  }

}

export {
  BookModel
}
