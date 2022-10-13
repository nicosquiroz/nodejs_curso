//aquí solo son funciones que se van a usar en la lógica en los services
const boom = require('@hapi/boom');

const { boomErrorHandler } = require("./error.handler");
// const { getProductSchema } = require('./../schemas/product.schema.js');
function validatorHandler(schema, property) {
  return (req, res, next) => { //recien creamos el middleware
      const data = req[property];
      //console.log(getProductSchema.validate(data));
      // req.body
      // req.params
      // req.query cualquiera de estas cosas puede ir en property

      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error));
      }
      next(); //esto es si no hay error y está todo bien
  }
}


module.exports = validatorHandler;
