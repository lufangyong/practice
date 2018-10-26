const fs = require('fs')
const util = require('util')
const co = require('co')

/**
 * 第一个阶段：callback 回调
 * @param {Functiono} cb 
 */
function readFile(cb) {
  fs.readFile('./package.json', (err, data) => {
    if (err) return cb(err)
    cb(null, data)
  })
}

readFile((err, data) => {
  if (!err) {
    data = JSON.parse(data)
    console.log('callback', data.name);
  }
})

/**
 * 第二阶段：promise
 * @param {String} path 
 */
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

readFileAsync('./package.json')
  .then(data => {
    data = JSON.parse(data)
    console.log('promise', data.name)
  })
  .catch(err => {
    console.log(err)
  })

// 第三阶段：co + Generator Function + promise
co(function* () {
  let data = yield util.promisify(fs.readFile)('./package.json')
  data = JSON.parse(data)
  console.log('co', data.name)
})

// 第四阶段：async 统一世界
const readAsync = util.promisify(fs.readFile)

async function init() {
  let data = await readAsync('./package.json')
  data = JSON.parse(data)
  console.log('async await', data.name)
}

init()