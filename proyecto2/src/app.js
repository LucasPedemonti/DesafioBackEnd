import { engine } from "express-handlebars";
import express from "express";
import { __filename, __dirname } from "./utils.js";
import viewsRoutes from "./routes/views.router.js";
import viewsRealTime from "./routes/realTimeProduct.router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { guardarProducto } from "./services/productUtils.js";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 8081;


//APP ENGINE
app.engine("handlebars", engine());//si tiene una funcion que tiene dos parentesis, significa ejecute el engine
app.set("view engine", "handlebars");//Va a buscar los archivos con extension handlebars
app.set("views", `${__dirname}/views`);//Que van a estar dentro del directorio src / views

// Configurar el directorio estático para archivos públicos
app.use(express.static("public"));

// Configurar middlewares
app
  .use(express.urlencoded({ extended: true })) // Parsear datos codificados en la URL
  .use(express.json()) // Parsear datos en formato JSON
  .use(express.static(`${__dirname}/public`)); // Servir archivos estáticos desde la carpeta "public"


// Rutas
app
  //.use("/api/products", productRoutes) // Rutas relacionadas con los productos
  //.use("/api/carts", cartRoutes); // Rutas relacionadas con los carritos
  app.use("/", viewsRoutes);
  app.use("/realtime", viewsRealTime);

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

// Configuración del lado del servidor
const io = new Server(httpServer);

// Configurar el evento de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Manejar eventos personalizados
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);

    // Enviar una respuesta al cliente
    socket.emit("respuesta", "Mensaje recibido correctamente");
  });

  // Escuchar evento 'agregarProducto' y emitir 'nuevoProductoAgregado'
  socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    guardarProducto(newProduct);
    // Agregar el nuevo producto a la lista de productos
    io.emit("nuevoProductoAgregado", newProduct);
  });

  /*socket.on("productoEliminado", (productID) => {
    // Eliminar el producto de la lista en el cliente
    const productoElement = document.querySelector(`[data-id="${productID}"]`);
    if (productoElement) {
      productoElement.parentElement.remove();
    }
  });
  */

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});