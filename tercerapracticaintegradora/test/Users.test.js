import mongoose from "mongoose";
import User from "../src/dao/dbManagers/userDao.js";
import Assert from "assert";
import userModel from "../src/dao/models/user.model.js"
//Assert.strict es un modulo nativo de nodejs, que nos permite hacer validaciones de forma estricta
//Si es verdadero lo va a dejar pasar, y si es negativo lo va a detener
const assert = Assert.strict

//HACEMOS LA PRIMERA PRUEBA 
mongoose.connect("mongodb+srv://lucaspedemonti91:lpdev91@cluster0.h7kvhpc.mongodb.net/ecommerce");
describe("Este conjunto de pruebas evalua algo", () => {
    it("Obtener los usuarios de la base de datos", async () => {
      const users = await userModel.find();
      //console.log(users);
      assert.strictEqual(Array.isArray(users), true);
    });
    it("Obtener los usuarios de la base de datos", async () => {
        const users = await userModel.find();
        //console.log(users);
        assert.strictEqual(Array.isArray(users), true);
      });
  
    it("Debe ser capaz de crear un usuario en base de datos", async () => {
      const user = {
        first_name: "Luis",
        last_name: "Pereti",
        email: "luisperti@gmail.com",
        password: "5555",
      };
      const users = new User();
      const result = await users.saveUser(user);
      //console.log(result);
  
      assert.notEqual(result, null);
    });
  
    it("Obtener un usuario", async () => {
      let email = "luisperez@gmail.com";
      const users = new User();
      const result = await users.getBy({ email: email });
      assert.notEqual(result, null);
    });
  });
  