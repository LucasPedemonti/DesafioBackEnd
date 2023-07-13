import { Router } from "express";
import { ProductManager } from "../classes/productManager.js";

const router = Router();
let productos = [];

const productManager = new ProductManager("productos.json");

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    let response = await productManager.getProducts();
    if (limit) {
      let tempArray = response.filter((dat, index) => index < limit);
      /* let tempArray = response.map((dat, index) => {
          return index < limit && dat;
        });
        */
      res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
    } else {
      res.json({ data: response, limit: false, quantity: response.length });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  let product = await productManager.getProductById(parseInt(pid));

  if (product) {
    res.json({ message: "success", data: product });
  } else {
    res.json({
      message: "el producto solicitado no existe",
    });
  }
});
router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const product = {};
  if (!title || !description || !code || !price || !stock || !category) {
    res.json({ message: "faltan datos" });
  } else {
    product.title = title;
    product.description = description;

    product.code = code;
    product.price = price;
    product.status = !status || typeof status !== "boolean" ? true : status;
    product.stock = stock;
    product.category = category;
    product.thumbnails = !thumbnails ? "" : thumbnails;

    try {
      const response = await productManager.addProduct(product);
      res.json({
        message: "producto agregado",
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error interno del servidor",
      });
    }
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const productTemp = {};
  let product = await productManager.getProductById(parseInt(pid));

  if (product) {
    ///accion de actualizar
    if (
      (!title,
      !description,
      !code,
      !price,
      !status,
      !stock,
      !category,
      !thumbnails)
    ) {
      res.json({ message: "faltan datos" });
    }
    //actualizamos nuestro producto temporal
    productTemp.title = title;
    productTemp.description = description;
    productTemp.code = code;
    productTemp.price = price;
    productTemp.status = status;
    productTemp.stock = stock;
    productTemp.category = category;
    productTemp.thumbnails = thumbnails;

    //actualizamos nuestro producto en el archivo
    let result = await productManager.updateProductById(
      parseInt(pid),
      productTemp
    );

    res.json({ message: "producto actualizado", data: result });
  } else {
    res.json({
      message: "el producto solicitado no existe, no se puede actualizar",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  let product = await productManager.getProductById(parseInt(pid));
  if (!product) {
    res.json({
      message: "el producto solicitado no existe, no se puede eliminar",
    });
  } else {
    let result = await productManager.deleteProductById(parseInt(pid));
    res.json({ message: "producto eliminado", data: result });
  }
});

export default router;