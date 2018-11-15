// pages/classic/classic.js
import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      // console.log(res.data)
      this.setData({
        classicData: res.data
      })
    })
  },
  onLike: function (event) {
    console.log(event)
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id)
  },
  methods: {

  },

})
