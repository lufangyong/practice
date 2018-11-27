import {
  HTTP
} from '../utils/http';

export default class LikeModel extends HTTP {
  like(behavior, id) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'

    this.request({
      url: url,
      method: 'post',
      data: {
        id: id
      }
    })
  }

  bookLike(behavior, id) {
    let url = behavior === 'like' ? '/book/like' : '/book/like/cancel'

    this.request({
      url: url,
      method: 'post',
      data: {
        id: id
      }
    })
  }

  getClassicLikeStatus(id, category, cb) {
    this.request({
      url: `/classic/${id}/${category}/favor`,
      success: cb
    })
  }

}
