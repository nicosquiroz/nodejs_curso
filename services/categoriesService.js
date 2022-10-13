//aquí va todo lo de crear, editar, etc... entonces voy a modificar "productsrouter antiguo"

const faker = require('faker');


class productsService {

  constructor(){
    this.products = []; //array inicia con 0 productos, aquí puede ir una base de datos externa
    this.generate();
  }



  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
       this.products.push({
         id: faker.datatype.uuid(),
         name: faker.commerce.productName(),
         price: parseInt(faker.commerce.price(), 10), //aquí le decimos que sea un número, en base 10
         image: faker.image.imageUrl(),
   });
    }
  }
   create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
    }

   find() {
      return this.products;
    }

   findOne(id) {
      return this.products.find(item => item.id === id);
    }

   update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    } else {
      const updatedProduct = this.products[index]
      this.products[index] = {
          ...updatedProduct,
          ...changes
        };
    return updatedProduct;
      }
    }

   delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    } else {
      this.products.splice(index,1);
      return id + " has been deleted";
    }

    }

}

module.exports = productsService;
