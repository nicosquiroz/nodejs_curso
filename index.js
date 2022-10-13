const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => { //esta estructura viene definida por el módulo cors, siendo el parametro origin lo que entre por esa funcion del módulo que viene por defecto, y luego se evalúa si ese origin está incluido en whitelist (si whitelist incluye el x origen...)
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors());


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});







//app.get('/products/filter', (req,res) => {
//  res.send('Yo soy un filter');
//}); //choca con el /products/:id! porque toma la palabra filter como un id!
//por lo tanto lo específico va antes que lo dinámico















app.listen(port, () => {
    console.log('Mi port ' + port);
});

console.log()



//es buena práctica separar el ruteo dependiendo del endpoint. todo lo de product a un archivo, todo lo de otra categoría a otro archivo
