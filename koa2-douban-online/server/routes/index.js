const {
  controller,
  get,
  post,
  put
} = require('../lib/decorator')
const {
  getAllMovies,
  getSingleMovie,
  getRelativeMovies
} = require('../service/movie')

@controller('api/v0/movies')
export class movieController {
  @get('/')
  async getMovies(ctx, next) {
    const {
      type,
      year
    } = ctx.query
    const movies = await getAllMovies(type, year)

    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id
    const movie = await getSingleMovie(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }

}
