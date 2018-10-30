const puppeteer = require('puppeteer')
const base = 'https://movie.douban.com/subject/'
const doubanId = '26739551'
const videoBase = `https:/movie.douban.com/trailer/219491 `

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;
(async () => {
  console.log('start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // 禁用沙箱
    headless: true, // 是否以无头模式运行浏览器(是否打开浏览器) 
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2' // 页面是否加载完成 
  })

  sleep(1000)


  // 在页面上下文环境中执行
  const result = await page.evaluate(() => {
    var $ = window.$
    var it = $('.related-pic-video')
    if (it && it.length > 0) {
      var link = it.attr('href')
      var cover = it.find('img').attr('src')
      return {
        link,
        cover
      }
    }
  })
  let video
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)
    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if (it && it.length > 0) {
        return it.attr('src')
      }

      return ''
    })
  }
  const data = {
    video,
    doubanId,
    cover: result.cover
  }
  browser.close()

  process.send({
    data
  })
  process.exit(0)
})()
