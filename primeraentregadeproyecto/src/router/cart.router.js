import { Router } from "express";
import CartManager from "../classes/cartManager.js";
import ProductManager from "../classes/productManager.js";

const router = Router();

// Crear instancias de CartManager y ProductManager que utilizan archivos JSON para almacenar los datos
let carritos = new CartManager("./src/data/carts.json");
let productos = new ProductManager("./src/data/products.json");

router
  .post("/", async (req, res) => {
    try {
      // Agregar un nuevo carrito
      await carritos.addCart();
      res.send({ status: "Success", message: "Carrito creado con éxito" });
    } catch (error) {
      // Manejar errores al crear el carrito
      res
        .status(400)
        .send({ status: "Error", error: "Error al crear el carrito" });
    }
  })

  .get("/:cid", async (req, res) => {
    try {
      // Obtener un carrito por su ID
      let { cid } = req.params;
      let cart = await carritos.getCartById(parseInt(cid));
      res.send({ cart });
    } catch (error) {
      // Manejar errores cuando no se encuentra un carrito con el ID dado
      res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
    }
  })

  .post("/:cid/products/:pid", async (req, res) => {
    try {
      // Obtener un producto por su ID y agregarlo al carrito
      let product = await productos.getProductById(parseInt(req.params.pid));
      await carritos.addProductToCart(req.params.cid, product.id);
      res.send({ status: "Success", message: "Producto añadido con éxito!" });
    } catch (error) {
      // Manejar errores al agregar un producto al carrito
      res
        .status(400)
        .send({
          status: "Error",
          error: "Error al cargar el producto al carrito",
        });
    }
  });

export default router;
