const express = require('express');
//reemplazo por faker:
const productsService = require('./../services/productsService');
const validatorHandler = require('./../middlewares/validator.handler.js'); //estos middlewares no son como errors que va en todas partes globalmente, estos dependen del tipo de data por lo tanto del tipo de ruta y servicio (hay un middleware de validación Joi diferente para usuarios xD)
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema.js');
const router = express.Router();
const service = new productsService();
//clase 13 servicios


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req,res, next) => {
  try {
    res.send('Yo soy un filter');
  } catch (error) {
    next(error);
  }

});

router.get('/:id',
  //AGREGO UN MIDDLEWARE DE VALIDACIÓN DE DATOS ANTES DEL MIDDLEWARE ERROR
  //console.log(getProductSchema),
  validatorHandler(getProductSchema, 'params'), //uso params porque de ahí viene el id
  async (req,res,next) => { //solo 1 objeto en específico
 // const { id } = req.params; // lo mismo que const  = req.params.id;
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);

  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id, body);
    res.json(updatedProduct);
  } catch (error) {
    // res.status(404).json({
    //   message: "Errorcillo: " + error.message
    // });
    next(error);
  }

});

router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const deleted = await service.delete(id);
  res.json(deleted);
});
//el 1212 viene del router en el navegador, en la barra, y esa información
//se añade al objeto de manera adicional a lo que ya existía.
module.exports = router;
