<template>
  <button
    :open-type="openType"
    :plain="true"
    @getuserinfo="getuserinfo"
    class="btn"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    openType: {
      type: String
    },
    // 按钮是否镂空，背景色透明
    plain: {
      type: Boolean
    }
  },
  methods: {
    getuserinfo(event) {
      this.$emit('getuserinfo', event.mp.detail)
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0 !important;
  border: none !important;
}
</style>