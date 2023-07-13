import express from "express";
import productRouter from "./router/products.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log("servidor esta running en el puerto" + PORT);
});