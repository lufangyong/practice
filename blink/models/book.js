import {
  HTTP
} from '../utils/http-p'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }

  search(q) {
    return this.request({
      url: `/book/search?title=${q}`
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

  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}`
    })
  }

  updateCommentNums(id) {
    return this.request({
      url: `/book_short_comment?id=${id}`,
      method: 'put'
    })
  }

  postComment(bid, comment) {
    return this.request({
      url: '/book_short_comment',
      method: 'post',
      data: {
        bookId: bid,
        content: comment,
        nums: 0
      }
    })
  }
}

export {
  BookModel
}
