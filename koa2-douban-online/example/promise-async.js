const fs = require('fs')
const util = require('util')
const readeAsync = util.promisify(fs.readFile)

async function init() {
  try {
    let data = await readeAsync('./package.json')
    data = JSON.parse(data)

    console.log('redeAsync', data.name);
  } catch (err) {
    console.log(err);
  }
}

init()