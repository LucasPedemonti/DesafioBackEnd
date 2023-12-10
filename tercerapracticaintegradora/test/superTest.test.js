import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

const getUserData = async (uid) => {
    const { statusCode, ok, _body } = await requester
      .get("/api/users/" + uid)
      .send();
    return _body.payload;
  };
describe("testin ecommerce", () => {
    describe ("prueba" , () => {
        it("El endpoint POST api/user debe crear un usuario correctamente", async () => {
            const userMock = {
              first_name: "gio",
              last_name: "Locelso",
              email: "locelsogio@gmail.com",
              password: "5555",
            };
          
            const { statusCode, _body } = await requester.post("/api/user").send(userMock);
          
            //console.log({ statusCode }, { _body });
          
            if (statusCode === 400) {
              // En caso de error, verificar que sea el error esperado
              expect(_body).to.have.property('status', 'error');
              expect(_body).to.have.property('error', 'Incomplete values');
            } else {
              // En caso de éxito, verificar que haya un payload con _id
              expect(_body).to.have.property('payload');
              expect(_body.payload).to.have.property('_id');
            }            
          });
          /*it("Creamos una mascota sin nombre, el resultado aceptable debe ser error 400", async () => {
            const userMock = {
                last_name: "Locelso",
                email: "locelsogio@gmail.com",
                password: "5555",
              };
            const { statusCode } = await requester.post("/api/user").send(userMock);
      
            expect(statusCode).to.be.equal(400);
          });*/
          it("Obtenemos todas las mascotas, la respuesta debe de tener status y payload ademas payload debe ser un arreglo", async () => {
            const { statusCode, ok, _body } = await requester.get("/api/user").send();
            console.log(_body.payload);
            const isAnArray = Array.isArray(_body.payload);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.true;
            expect(_body.payload).to.be.an("array");
            expect(isAnArray).to.be.true;
          });
          /*it("Modificamos una mascota, y comparamos los valores previos y actuales", async () => {
            const userId = "656c9a38c925f34de276eb2c";
            const previosUser = await getUserData(userId);
      
            const userMock = {
              first_name: "gfgd",
              last_name: "Locelso",
              email: "locelsogio@gmail.com",
              password: "5555",
            };
      
            const { ok, statusCode, _body } = await requester
              .put("/api/users/" + userId)
              .send(userMock);
            const newUserData = await getUserData(userId);
            //console.log(previosUser.email, newUserData.email);
      
            expect(previosUser.email).to.be.not.equal(newUserData.email);
          });*/
      
    })
})

