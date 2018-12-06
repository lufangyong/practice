<template>
  <div class="container">
    <img
      src="../../../static/me/my@bg.png"
      alt=""
      class="bg"
    >
    <div class="login-wrapper">
      <button
        plain="true"
        open-type="getUserInfo"
        @getuserinfo="getuserinfo"
        class="login-btn"
      >
        <img
          :src="userInfo.avatarUrl"
          alt=""
        >
      </button>
      <p>{{userInfo.nickName}}</p>
    </div>
    <year-progress></year-progress>
    <button
      @click='scanBook'
      class='btn'
    >添加图书</button>
  </div>
</template>

<script>
import YearProgress from '../../components/YearProgress'

export default {
  name: 'index',
  data() {
    return {
      userInfo: {
        avatarUrl: '../../../static/me/my.png',
        nickName: '请登录'
      },
      // 经授权的
      authorized: false
    }
  },
  components: {
    YearProgress
  },
  created() { },
  onShow() {
    // this.userAuthorized()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
  },
  methods: {
    getuserinfo(event) {
      const { userInfo } = event.mp.detail
      // console.log(userInfo)
      wx.setStorageSync('userInfo', userInfo)

      if (userInfo) {
        this.userInfo = userInfo
      }
    },
    scanBook() {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    // 如果用户授权过，直接拿到用户信
    userAuthorized() {
      wx.getSetting({
        success: data => {
          if (data.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: data => {
                this.userInfo = data.userInfo
                this.authorized = true
              }
            })
          }
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .bg {
    width: 750rpx;
    height: 574rpx;
  }
  .login-wrapper {
    position: absolute;
    margin: 0 auto;
    top: 225rpx;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
  .login-btn {
    padding: 0 !important;
    border: none !important;
    img {
      width: 120rpx;
      height: 120rpx;
      overflow: hidden;
      border-radius: 50%;
    }
  }
}
</style>
