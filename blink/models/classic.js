import {
  HTTP
} from '../utils/http'

export default class ClassicModel extends HTTP {
  getLatest(cb) {
    this.request({
      url: '/classic/latest',
      success: res => {
        cb(res)
      }
    })
  }
}
