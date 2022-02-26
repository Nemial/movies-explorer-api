const Movie = require('../models/movies');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { trailer, ...movieData } = req.body;
  Movie.create({ trailerLink: trailer, ...movieData, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        return Promise.reject(new ForbiddenError('Нет прав для удаления фильма'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send(JSON.stringify({ message: 'Success' })));
    })
    .catch(next);
};
