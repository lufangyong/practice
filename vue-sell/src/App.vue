<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import VHeader from '@/components/VHeader'

  export default {
    components: {
      VHeader
    },
    data() {
      return {
        seller: {},
      }
    },
    created() {
      this.axios.get('/api/v1/vue-sell/seller').then(res => {
        const {status} = res

        if (status.toString().startsWith('2')) {
          if (res.data.code === 0) {
            this.seller = res.data.data[0].seller
          }
        }

      })
    }
  }
</script>

<style scoped lang="stylus">
  @import './common/stylus/mixin.styl'

  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.router-link-active
          color rgb(240, 20, 20)
</style>
