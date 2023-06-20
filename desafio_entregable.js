class ProductManager {
  products;
  constructor() {
    this.products = [];
  }
  static correlativoId = 0;
  addProduct(title, description, price, thumbnail, code, stock) {
    //id: this.products.length +1,

    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      throw new Error("El codigo ya existe por favor verifique");
    } else {
      ProductManager.correlativoId++;
      const newProduct = {
        id: ProductManager.correlativoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
    }

    // if () {

    // }
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    let product = this.products.find((dato) => dato.id === id);

    if (product !== undefined) {
      return product;
    } else {
      return "no existe el producto solicitado";
    }
  }
}
let myFirstPRoducts = new ProductManager () ; 
myFirstPRoducts.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "sin imagen",
  "abc123",
  25
);
//agregamos un duplicado este evento generara un error
/*myFirstPRoducts.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25
  );*/
/*
  myFirstPRoducts.addProduct(
    "Mesa",
    "Ratona",
    150,
    "http://Mesa.jgp",
    "64d",
    20
  );
  */
console.log("desde getProducts", myFirstPRoducts.getProducts());
console.log("desde getProducts", myFirstPRoducts.getProducts(1));

//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(1)); // ok
//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(10)); // error