const express = require('express');
const faker = require('faker');

const router = express.Router();

//clase 13 servicios


router.get('/', (req, res) => {
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

router.get('/filter', (req,res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req,res) => { //solo 1 objeto en específico
  const { id } = req.params; // lo mismo que const  = req.params.id;
  if (id === '999') { //los parámetros llegan como strings, así que va con '999'
    res.status(404).json({
      message: 'not found'
    });
  } else {
    res.status(200).json({
      id,
      name: 'Product 2',
      price: 2000
    });
  }
})

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req,res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  })
})

router.delete('/:id', (req,res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  })
})
//el 1212 viene del router en el navegador, en la barra, y esa información
//se añade al objeto de manera adicional a lo que ya existía.
module.exports = router;
