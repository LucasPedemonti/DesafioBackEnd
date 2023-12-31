import { Router } from "express";
import { passportCall } from "../utils.js";
import { createUserDTO } from "../DTO/userDTO.js"; 

const router = Router();

// Ruta para obtener el usuario actual
router.get('/', passportCall('jwt'), (req, res) => {
  console.log("en current", req.user)
  if (!req.user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }
  const userDTO = createUserDTO(req.user);

  res.json({ user: userDTO });
});

export default router;

// import { Router } from "express";
// import { __dirname } from "../utils.js";
// import { passportCall,authorization} from "../utils.js";



// const router =Router()
// // Ruta para obtener el usuario actual

// router.get('/', passportCall('jwt'), (req, res) => {
//   // El usuario actual se encuentra en req.user gracias a la estrategia 'jwt'
//   if (!req.user) {
//     return res.status(401).json({ message: 'Usuario no encontrado' });
//   }

//   // Renderiza la vista 'current' y pasa los datos del usuario como contexto
//  // res.render('current', {  user:user });
//     res.json({ user: req.user });
 
// });

// export default router;