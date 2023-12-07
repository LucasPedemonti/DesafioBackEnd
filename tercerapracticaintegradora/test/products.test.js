import chai from 'chai';
import supertest from 'supertest';


const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Products Router', () => {
//   it('should return a list of products', async () => {
//     const response = await request.get('/products');
   
//     expect(response.body).to.be.an('array');
//   });

//   it('should create a new product', async () => {
//     const newProduct = { name: 'New Product', price: 9.99 };
//     const response = await request.post('/products').send(newProduct);
//     expect(response.status).to.equal(201);
//     expect(response.body).to.include(newProduct);
//   });

  it('should update an existing product', async () => {
    const updatedProduct = { stock: 4, price: 12.99 };
    const response = await request.post('/updateproducts/64e13525d8a57bb9ac8ce789').send(updatedProduct);
    expect(response.body).to.be.an('object');
    expect(response.body).to.include(updatedProduct);
  });
});