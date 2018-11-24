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

})
