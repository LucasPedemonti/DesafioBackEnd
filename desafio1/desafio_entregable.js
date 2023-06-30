//Primero creamos una clase Product Manager y el construsctor que contiene los productos, con esta clase podriamos crear muchas tiendas
class ProductManager {
  products;
  constructor () {
    this.products= [];
  }
  static correlativoId=0;//Crear un metodo estatico, forman parte de la clase ,son independientes de las instancias

  addProduct(title, description, price, thumbnail, code, stock){ //recibe todos estos parametros
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
    let codeExists = this.products.some(dato => dato.code ==code);

    if(codeExists){
        throw new Error("El codigo ya existe")        
    } else{ 
        //id: this.products.length +1,
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
  }
  //Me devuelve todos los productos
  getProducts(){
    return this.products;
  }
  //Hace una busqueda por el arreglo products, comparando el ir que recibimos con el id existente, si existe devolvemos el producto, de lo contrario devolvemos el producto no existe
  getProductsById(id){
    let product = this.products.find((dato) => dato.id === id);

    if (product !== undefined){
        return product;
    }else{
        return "no existe el producto solicitado"
    }
  }
}
let productList = new ProductManager()
productList.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25,
);
/*
let productList = new ProductManager()
productList.addProduct(
    "pelota",
    "futbol",
    10,
    "pelota.jpg",
    "123a",
    23,
);
productList.addProduct(
    "pelota",
    "futbol",
    10,
    "pelota.jpg",
    "123b",
    23,
);
productList.addProduct(
    "pelota",
    "futbol",
    10,
    "pelota.jpg",
    "123s",
    23,
);
*/
console.log("Desde getProducts",productList.getProducts());//Me devuelve todos los productos
//console.log("Mi producto filtrado por ID 1",productList.getProductsById(2));//Me devuelve el producto con el ID 2
//console.log("Mi producto filtrado por ID 2",productList.getProductsById(5));//Como no existe el producto con el ID 5 me devuelve Mi producto filtrado por ID 2 no existe el producto solicitado