import { Router } from "express";
import UserModel from "../models/user.model.js";
import Swal from 'sweetalert2';
//import { auth } from "./middlewares.routes.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await UserModel.findOne({ email: username, password }).lean();

  // Validación para el usuario administrador
  if (username === 'lucas@dev.com' && password === '123456') {
      req.session.user = {
      email: username,
      admin:true,
    };

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  if (!result) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error en la autenticación!',
      
    });
    

    return res.status(401).json({ respuesta: "Error de autenticación" });
  }
  if (username !== 'lucas@dev.com' && password !== '123456'){ 
  req.session.user = {
    email: username,
    admin:false
  };
}
  res.status(200).json({ respuesta: "Autenticado exitosamente" });
});

router.post("/signup", async (req, res) => {
  const { username, password, first_name, last_name, age} = req.body;
});


export default router;