const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .regex(/^(http:\/\/|https:\/\/)(www\.)?.+\..+\/?[\d\w\-._~:/?[\]@!$&'()*+,;=](#)?$/)
      .required(),
    trailer: Joi.string()
      .regex(/^(http:\/\/|https:\/\/)(www\.)?.+\..+\/?[\d\w\-._~:/?[\]@!$&'()*+,;=](#)?$/)
      .required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string()
      .regex(/^(http:\/\/|https:\/\/)(www\.)?.+\..+\/?[\d\w\-._~:/?[\]@!$&'()*+,;=](#)?$/)
      .required(),
    movieId: Joi.string().hex().length(24).required(),
  }).required(),
}), createMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
