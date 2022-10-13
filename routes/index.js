const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); //aquí podría crear otra versión con algo diferente a router (?)
  //ejemplo? se usa el mismo express.Router();? cómo lo diferencio del anterior?
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
