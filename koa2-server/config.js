module.exports = {
  port: 3000, // 项目启动的端口
  db: 'mongodb://localhost:27017/practice', // 数据库
  // db: 'mongodb://47.107.123.70:27017/practice',
  saltTimes: 3 // 校验的次数（用户密码加密）
}
