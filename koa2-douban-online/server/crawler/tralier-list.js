const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=%E7%94%B5%E5%BD%B1,%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A`

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
  await page.goto(url, {
    waitUntil: 'networkidle2' // 页面是否加载完成 
  })

  sleep(3000)

  // 选择页面中的一个元素
  await page.waitForSelector('.more')
  for (let i = 0; i < 2; i++) {
    await sleep(3000)
    // 点击事件
    await page.click('.more')
  }

  // 在页面上下文环境中执行
  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = Number(it.find('.rate').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })

  browser.close()

  process.send({
    result
  })
  process.exit(0)
})()
