const rp = require('request-promise-native')

const fetchMovie = async item => {
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  const res = await rp(url)

  try {
    res = JSON.parse(res)
  } catch (err) {
    console.log(err);
  }

  return res
}

;
(async () => {
  let movies = [{
      doubanId: 26013293,
      title: '抱紧他',
      rate: 7.6,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2251544503.jpg'
    },
    {
      doubanId: 26304268,
      title: '致命礼物',
      rate: 6.6,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2260731928.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    console.log(movieData)
  })
})()
