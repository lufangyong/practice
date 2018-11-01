const puppeteer = require('puppeteer')

// 生成截图
const createScreenShot = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false, // 是否打开 headless 无头模式 
    defaultViewport: {
      width: 800,
      height: 600,
    }
  })
  const page = await browser.newPage()

  await page.goto('https://wwww.baidu.com')

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: window.screen.height,
      height: window.screen.height,
    }
    // return {
    //   width: document.documentElement.clientWidth,
    //   height: document.documentElement.clientHeight,
    //   deviceScaleFactor: window.devicePixelRatio
    // }
  })
  console.log('Dimensions:', dimensions)

  await page.screenshot({
    path: 'example.png',
    fullPage: true,
  })

  browser.close()
}

// 生成 pdf
const createPdf = async () => {
  const browser = await puppeteer.launch({
    headless: true, // 是否打开 headless 模式
  })
  const page = await browser.newPage()

  await page.goto('https://wwww.baidu.com')
  await page.pdf({
    path: 'example.pdf',
    format: 'A4'
  })

  browser.close()
}

// 例子 打开百度 搜索 puppeteer
const openBaidu = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false, // 是否打开 headless 无头模式
  })
  const page = await browser.newPage()

  await page.goto('https://wwww.baidu.com', {
    waitUntil: 'networkidle2' // 页面是否加载完成 
  })
  // 找到 input 输入框 模拟用户输入
  await page.type('#kw', 'puppeteer', {
    delay: 100
  })
  page.click('#su')

  await page.waitFor(1000)
  const links = await page.evaluate(() => {
    var $ = window.$
    var items = $('.result .t a')
    var links = []

    if (items.length > 1) {
      items.each((index, item) => {
        let it = $(item)
        let href = it.attr('href')
        let text = it.html()

        links.push({
          href,
          text
        })
      })
    }
    return links
  })
  let targetLink = links.filter(item => {
    return item.text && item.text.includes('爬虫利器')
  })
  // console.log('targetLink', targetLink)
  await page.goto(targetLink[0].href)
  await page.waitFor(1000)
  browser.close()
}

openBaidu()
