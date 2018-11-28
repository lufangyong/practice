// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book'
import LikeModel from '../../models/like'

const bookModel = new BookModel()
const likeModel = new LikeModel()

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
    wx.showLoading()
    const bid = this.options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0].data.data,
        comments: res[1].data.data,
        likeStatus: res[2].data.data.likeStatus,
        likeCount: res[2].data.data.favNums,
      })
      wx.hideLoading()
    })

  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
  
    likeModel.bookLike(like_or_cancel, this.data.book.id)
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
    const {
      id,
      text
    } = event.detail

    bookModel.updateCommentNums(id).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })

      this.data.comments.unshift({
        content: text,
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
