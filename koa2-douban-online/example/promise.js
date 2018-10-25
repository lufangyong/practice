const fs = require('fs')
const util = require('util')

// 使用回调 第一个参数 err
fs.readFile('./package.json', (err, data) => {
  if (err) return console.log(err)

  const data = JSON.parse(data)
  console.log('callback', data.name);
})

// 使用 promise
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
    const data = JSON.parse(data)
    console.log('promise', data.name);
  })
  .catch(err => {
    console.log(err);
  })

// 使用 util 工具函数
util.promisify(fs.readFile)('./package.json')
  .then(res => {
    const data = JSON.parse(res)
    console.log('util promisify', data.name);
  })