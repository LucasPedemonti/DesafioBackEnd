import { Router } from "express";
import ProductManager from "../classes/productManager.js";

const router = Router();

// Crear una instancia de ProductManager que utiliza un archivo JSON para almacenar los productos
let productos = new ProductManager("./src/data/products.json");

router
  .get("/", async (req, res) => {
    try {
      // Obtener todos los productos
      let products = await productos.getProducts();

      let { limit } = req.query;
      if (limit) {
        // Limitar la cantidad de productos si se proporciona un límite
        products.length = limit;
        res.send({ products });
      } else {
        res.send({ products });
      }
    } catch (error) {
      // Manejar errores al buscar los productos
      res
        .status(400)
        .json({ success: false, error: "Error al buscar los productos" });
    }
  })

  .get("/:pid", async (req, res) => {
    try {
      // Obtener un producto por su ID
      const products = await productos.getProductById(parseInt(req.params.pid));
      res.send({ products });
    } catch (error) {
      // Manejar errores cuando no se encuentra un producto con el ID dado
      res
        .status(404)
        .json({
          success: false,
          error: `El producto con el id: ${req.params.pid} no existe!`,
        });
    }
  })

  .post("/", async (req, res) => {
    try {
      // Agregar un nuevo producto
      let product = req.body;
      await productos.addProducts(product);
      res.send({ status: "Success", message: "Producto agregado con éxito!" });
    } catch (error) {
      // Manejar errores al agregar un producto inválido
      res
        .status(400)
        .send({
          status: "Error",
          message: "Producto inválido, verifique los datos de entrada.",
        });
    }
  })

  .put("/:pid", async (req, res) => {
    try {
      // Actualizar un producto existente
      const {
        body,
        params: { pid },
      } = req;
      console.log(body);
      await productos.updateProducts(pid, body);
      res.send({
        status: "Success",
        message: `Producto actualizado con éxito!`,
      });
    } catch (error) {
      // Manejar errores al actualizar un producto
      res
        .status(400)
        .send({
          status: "Error",
          message: "No se pudo actualizar, verifique los datos de entrada.",
        });
    }
  })

  .delete("/:pid", async (req, res) => {
    try {
      // Eliminar un producto por su ID
      const pid = parseInt(req.params.pid);
      await productos.deleteProduct(pid);
      res.send({ status: "Success", message: `Producto eliminado con éxito!` });
    } catch (error) {
      // Manejar errores al eliminar un producto
      res
        .status(400)
        .send({ status: "Error", message: "Error al eliminar un producto" });
    }
  });

export default router;
