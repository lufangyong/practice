// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book'

const bookModel = new BookModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = this.options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)

    detail.then(res => {
      // console.log(res.data.data)
      this.setData({
        book: res.data.data
      })
    })

    comments.then(res => {
      // console.log(res.data.data)
      this.setData({
        comments: res.data.data
      })
    })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    console.log('like_or_cancel', like_or_cancel)
    // likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onClickTag(event) {
    const id = event.detail._id

    bookModel.putclickComment(id).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: "none"
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
})
