const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({

    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateProfile);

module.exports = userRouter;
