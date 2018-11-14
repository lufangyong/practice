'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542072626934_5935'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler']

  // 安全
  config.security = {
    // 伪造用户请求向网站发起恶意请求
    csrf: {
      enable: false, // 关闭安全插件提供的功能
    },
    domainWhiteList: ['http://localhost:8000'], // 可拓展 href 和 src 中允许的域名白名单
  }

  // port
  exports.cluster = {
    listen: {
      port: 3000,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    }
  }

  // mongoose config
  config.mongoose = {
    client: {
      // url: 'mongodb://127.0.0.1/practice',
      url: 'mongodb://47.107.123.70/practice',
      options: {},
    },
  }

  return config
};
