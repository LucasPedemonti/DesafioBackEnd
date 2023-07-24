// import fs from "fs";

// class Cart {
//   constructor() {
//     this.products = [];
//   }
// }

// class CartManager {
//   constructor(path) {
//     this.path = path;
//   }

//   // Agregar un carrito al archivo
//   async addCart() {
//     try {
//       const cart = new Cart();
//       let dataCart = await fs.promises.readFile(this.path, "utf-8");
//       let dataCartParse = JSON.parse(dataCart);
//       const data = dataCartParse
//         ? [...dataCartParse, { id: dataCartParse.length + 1, ...cart }]
//         : [{ ...cart, id: dataCartParse.length + 1 }];

//       // Escribir los datos actualizados en el archivo
//       await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
//     } catch (error) {
//       console.log("Hubo un error");
//     }
//   }

//   // Agregar un producto a un carrito específico
//   async addProductToCart(cartId, prodId) {
//     let dataCart = await fs.promises.readFile(this.path, "utf-8");
//     let dataCartParse = JSON.parse(dataCart);
//     let cart = dataCartParse.find((cart) => cart.id === parseInt(cartId));

//     if (cart) {
//       const prodIndex = cart.products.findIndex((prod) => prod.id === prodId);
//       if (prodIndex !== -1) {
//         cart.products[prodIndex].quantity++;
//         const cartIndex = dataCartParse.findIndex(
//           (cart) => cart.id === parseInt(cartId)
//         );
//         dataCartParse[cartIndex] = cart;

//         // Escribir los datos actualizados en el archivo
//         await fs.promises.writeFile(
//           this.path,
//           JSON.stringify(dataCartParse, null, 2)
//         );
//       } else {
//         let product = { id: prodId, quantity: 1 };
//         cart.products.push(product);
//         dataCartParse.push(cart);

//         // Escribir los datos actualizados en el archivo
//         await fs.promises.writeFile(
//           this.path,
//           JSON.stringify(dataCartParse, null, 2)
//         );
//       }
//     } else {
//       console.log("Carrito no encontrado");
//     }
//   }

//   // Obtener un carrito por su ID
//   async getCartById(id) {
//     try {
//       let dataCart = await fs.promises.readFile(this.path, "utf8");
//       let dataCartParse = JSON.parse(dataCart);
//       let cart = dataCartParse.find((cart) => cart.id === id);
//       if (cart) {
//         return cart;
//       } else {
//         console.log(`No existe el carrito con el ID ${id}`);
//         return null;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// export default CartManager;
