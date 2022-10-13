//middleware que captura cualquier error, por ahora logeado en la consola
function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload); //aquí sale con el statusCode dinámico que viene del tipo de error definido en la función de origen.
  } //ahora, si no es boom es un error normal y le doy el next(err) para que lo tome la función anterior
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler };
