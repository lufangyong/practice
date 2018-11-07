const {
  controller,
  get,
  post,
  put
} = require('../lib/decorator')
const {
  checkPassword
} = require('../service/admin')

@controller('api/v0/user')
export class userController {
  @post('/')
  async checkPassword(ctx, next) {
    const {
      email,
      password
    } = ctx.requset.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }

    return (ctx.body = {
      success: false,
      err:'密码不正确'
    })
  }
}
