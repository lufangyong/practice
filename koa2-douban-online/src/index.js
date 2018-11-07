import './assets/common.scss'

function changeTitle() {
  window.$('#app').html('parcel 打包')
}

setTimeout(function () {
  changeTitle()
}, 2000)
