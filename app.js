require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Console = require('console');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const NotFoundError = require('./errors/not-found-error');
const { createUser, login } = require('./controllers/users');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_PATH } = process.env;
const app = express();

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.get('/signout', (req, res) => {
  res.status(200).clearCookie('token', { domain: 'movies-explorer.nem.nomoredomains.work' }).end();
});
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  Console.log(`App listening on port ${PORT}`);
});
