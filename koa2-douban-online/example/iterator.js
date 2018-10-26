/**
 * 实现迭代器
 * @param {Array}arr 
 */
function makeIterator(arr) {
  let nextIndex = 0
  return {
    next: () => {
      // next 方法返回的结果对象
      if (nextIndex < arr.length) {
        return {
          vlaue: arr[nextIndex++],
          done: false
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}

const it = makeIterator(['eat', 'sleep', 'da dou dou'])

console.log('first', it.next().vlaue);
console.log('secondly', it.next().vlaue);
console.log('then', it.next().vlaue);
console.log('last', it.next().done);

console.log('============================== generator ==============================');
// 使用es6 中的 generator
function* makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const gen = makeIterator(['eat', 'sleep', 'da dou dou'])

console.log('generator first', gen.next().vlaue);
console.log('generator secondly', gen.next().vlaue);
console.log('generator then', gen.next().vlaue);
console.log('generator last', gen.next().done);