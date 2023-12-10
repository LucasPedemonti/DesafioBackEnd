import chai from "chai";
import mongoose from "mongoose";
import User from "../src/dao/dbManagers/userDao.js";
import userModel from "../src/dao/models/user.model.js"

//HACEMOS LA PRIMERA PRUEBA 
/*mongoose.connect("mongodb+srv://lucaspedemonti91:lpdev91@cluster0.h7kvhpc.mongodb.net/ecommerce");
//Consiguracion de CHAI
*/
const expect = chai.expect;
/*
describe("Este conjunto de pruebas evaluara nurstra api", ()=> {
     this.timeout(5000);
     before(async function () {
        mongoose.connect("mongodb+srv://lucaspedemonti91:lpdev91@cluster0.h7kvhpc.mongodb.net/ecommerce");
     });
           
   
    it("Obtener los usuarios de la base de datos", async () => {
        const result = await userModel.find();
        expect(result).to.be.an("array");
      });
})
*/
describe("Este conjunto de pruebas evaluara nuestros datos", () => {
    before(async function () {
        // Conectar a la base de datos antes de ejecutar las pruebas
        await mongoose.connect("mongodb+srv://lucaspedemonti91:lpdev91@cluster0.h7kvhpc.mongodb.net/ecommerce");
    });
    it("la suma de 2 + 2 debe ser 4", () => {
      expect(2 + 2)
        .to.be.equal(4)
        .and.to.be.a("number");
    });
    it("Obtener los usuarios de la base de datos", async () => {
        const users = await userModel.find();
        //expect(result).to.be.an("array");
        //expect(Array.isArray(result)).to.be.true;
        //expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(users)).to.be.equal(true);
        //console.log(users);
    });
    it("Borrar el usuario creado", async () => {
        const users = new User();
        const filteredUser = await users.getBy({ email: "lio10@gmail.com" });
        const result = await users.delete(filteredUser._id);
        expect(result).to.be.ok;
      });
    it("Debe ser capaz de crear un usuario en base de datos", async () => {
        const user = {
          first_name: "lionel",
          last_name: "Messi",
          email: "lio10@gmail.com",
          password: "laescaloneta",
        };
        const users = new User();
        const result = await users.saveUser(user);
        //console.log(result);
        expect(result).to.be.ok;
        expect(result).to.be.an("object")
        .and.to.have.property("_id");
    });       
    it("Obtener el usuario creado", async () => {
        const users = new User();
        const result = await users.getBy({ email: "lio10@gmail.com" });
        expect(result).to.be.an("object").and.to.have.property("_id");
      }); 

})