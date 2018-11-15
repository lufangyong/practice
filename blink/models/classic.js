import {
  HTTP
} from '../utils/http'

export default class ClassicModel extends HTTP {
  getLatest(cb) {
    this.request({
      url: '/blink/classic/1',
      success: res => {
        cb(res)
      }
    })
  }
}
