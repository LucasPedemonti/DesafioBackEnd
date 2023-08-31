//validar si el elemento existe en el dom para evitar errores
//const elementExists = (id) => document.getElementById(id) !== null;
//ejemplo de uso
/*elementExists("send") &&
  document.getElementById("send").addEventListener("click", function () {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
*/
async function postLogin(username, password) {
    console.log(username, password);
    const response = await fetch("/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
    return result;
  }
  
  const loginForm = document.getElementById("login-form");
  
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    postLogin(username, password).then((datos) => console.log(datos));
  });