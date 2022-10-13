const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/hola', (req, res) => {
  res.send('Hola mi server en express, ruta hola');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10), //aquí le decimos que sea un número, en base 10
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
  res.json([{
    name: 'Producto 1',
    price: 1000
  },
  {
    name: 'Product 2',
    price: 1000
  }
  ]);
});

app.get('/products/filter', (req,res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req,res) => { //solo 1 objeto en específico
  const { id } = req.params; // lo mismo que const  = req.params.id;
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  })
})

//imput más complejo con 2 parámetros:

app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

//app.get('/products/filter', (req,res) => {
//  res.send('Yo soy un filter');
//}); //choca con el /products/:id! porque toma la palabra filter como un id!
//por lo tanto lo específico va antes que lo dinámico


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
    limit,
    offset
    });
  } else {
    res.send('No hay parámetros query');
  }
});












app.listen(port, () => {
    console.log('Mi port ' + port);
});




//es buena práctica separar el ruteo dependiendo del endpoint. todo lo de product a un archivo, todo lo de otra categoría a otro archivo
