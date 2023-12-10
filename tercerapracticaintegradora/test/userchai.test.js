import chai from "chai";
import mongoose from "mongoose";
import User from "../src/dao/dbManagers/userDao.js";
import userModel from "../src/dao/models/user.model.js";
import { createHash,isValidPassword } from "../src/utils.js";
import UserDTO from "../src/DTO/userDTO.js";


const expect = chai.expect;
let contrasenaTest = "1234";
let saveHash = "";
describe("Este conjunto de pruebas evaluara nuestros datos", () => {
    before(async function () {
        // Conectar a la base de datos antes de ejecutar las pruebas
        await mongoose.connect("mongodb+srv://lucaspedemonti91:lpdev91@cluster0.h7kvhpc.mongodb.net/ecommerce");
    });
    it("Validar hasheo de password", async() => {
        const hash = await createHash(contrasenaTest);
        const result = contrasenaTest === hash;
        saveHash = hash;
        expect(result).to.be.false;
    });
    it("Validar password", async () =>{
        const result = await isValidPassword(saveHash, contrasenaTest);
        expect(result).to.be.true;
    });
    it("Alteramos el hash", async () => {
        const result = await isValidPassword(saveHash, "12345")
        expect(result).to.be.false;
    })
    it("El DTO no debe tener el campo first_name", async () => {
        const user = {
          first_name: "Lautaro",
          last_name: "Martinez",
          role: "admin",
          email: "toro@gmail.com",
        };
        console.log("Valor de user:", user);
        const userDTO = new UserDTO(user);                   
        expect(userDTO).to.be.an("object").and.to.not.have.property("first_name");
        expect(userDTO).to.be.an("object").and.to.not.have.property("last_name");
        expect(userDTO).to.be.an("object").and.to.not.have.property("password");        
      });
});    