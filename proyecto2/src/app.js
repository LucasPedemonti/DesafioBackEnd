import express from "express";
import productRoutes from "./router/product.router.js";
import cartRoutes from "./router/cart.router.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

const app = express();
const PORT = process.env.PORT || 8080;

// Configurar middlewares
app
  .use(express.urlencoded({ extended: true })) // Parsear datos codificados en la URL
  .use(express.json()) // Parsear datos en formato JSON
  .use(express.static(`${__dirname}/public`)); // Servir archivos estáticos desde la carpeta "public"

//APP ENGINE
app.engine("handlebars", engine());//si tiene una funcion que tiene dos parentesis, significa ejecute el engine
app.set("view enginw", "handlebars");//Va a buscar los archivos con extension handlebars
app.set("views", "./src/views");//Que van a estar dentro del directorio src / views

// Rutas
app
  .use("/api/products", productRoutes) // Rutas relacionadas con los productos
  .use("/api/carts", cartRoutes); // Rutas relacionadas con los carritos

// Iniciar el servidor
const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
});

// Manejar errores
connectedServer.on("error", (error) => {
  console.log(error.message);
});
