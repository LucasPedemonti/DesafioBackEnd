import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Agregar productos al archivo
  async addProducts(product) {
    try {
      let dataProduct = await fs.promises.readFile(this.path, "utf-8");
      let dataProdParse = JSON.parse(dataProduct);

      // Verificar si el producto ya existe y si los campos cumplen con los requisitos
      if (
        dataProdParse.some((num) => num.code == product.code) !== true &&
        product.title !== "" &&
        product.description !== "" &&
        product.price > 0 &&
        product.status === true &&
        product.thumbnail !== "" &&
        product.stock >= 0
      ) {
        const data = dataProdParse
          ? [...dataProdParse, { ...product, id: dataProdParse.length + 1 }]
          : [{ ...product, id: dataProdParse.length + 1 }];

        // Escribir los datos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        console.log(`Producto agregado con el id: ${dataProdParse.length + 1}`);
      } else {
        const salida =
          dataProdParse.some((num) => num.code == product.code) === true
            ? "El producto ya fue agregado"
            : "Los campos no pueden estar vacíos";
        console.log(salida);
      }
    } catch (error) {
      console.log("Error en la escritura", error);
    }
  }

  // Obtener todos los productos del archivo
  async getProducts() {
    let dataProduct = await fs.promises.readFile(this.path, "utf-8");
    let dataProdParse = JSON.parse(dataProduct);
    if (dataProdParse.length) {
      return dataProdParse;
    } else {
      console.log("No hay productos");
    }
  }

  // Obtener un producto por su ID
  async getProductById(id) {
    try {
      let dataProduct = await fs.promises.readFile(this.path, "utf-8");
      let dataProdParse = JSON.parse(dataProduct);
      let product = dataProdParse.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log(`No se encontró el producto con el ID: ${id}`);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Actualizar un producto por su ID
  async updateProducts(id, object) {
    try {
      let dataProduct = await fs.promises.readFile(this.path, "utf-8");
      let dataProdParse = JSON.parse(dataProduct);
      let product = dataProdParse.findIndex((product) => product.id === +id);
      if (product > -1) {
        const key = Object.keys(object)[0];
        const newValue = object[key];
        dataProdParse[product][key] = newValue;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataProdParse, null, 2)
        );
        console.log("Actualizado con éxito");
      } else {
        console.log(`No existe el producto con el ID ${id}`);
        return null;
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  // Eliminar un producto por su ID
  async deleteProduct(id) {
    try {
      let dataProduct = await fs.promises.readFile(this.path, "utf8");
      let dataProductParse = JSON.parse(dataProduct);
      let product = dataProductParse.find((product) => product.id === id);
      if (product) {
        const dataProdFilter = dataProductParse.filter(
          (product) => product.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(dataProdFilter, null, 2)
        );
        console.log("Producto eliminado con éxito");
      } else {
        console.log(`No existe el producto con el ID: ${id}`);
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}
