<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="bran"></span>
          <span class="name"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header'
}
</script>

<style scoped lang="stylus">
.header
  position relative
  overflow hidden
  color #fff
  background rgba(7, 17, 27, 0.5)
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    .avatar
      display inline-block
      vertical-align top
      width 64px
      height 64px 
      background #000
    .content
      position relative
</style>