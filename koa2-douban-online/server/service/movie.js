import mongoose from 'mongoose'

export const getAllMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)

  return movies
}

export const getRelativeMovies = async (movie) => {
  const Movie = mongoose.model('Movie')
  const relativeMovies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })

  return relativeMovies
}

export const getSingleMovie = async (id) => {
  const Movie = mongoose.model('Movie')
  const movie = await Movie.findOne({
    _id: id
  })

  return movie
}
