// LOGICA PARA EL BOTON IR CAMBIAR ROL
document.querySelectorAll('.change-role-button').forEach(button => {
  button.addEventListener('click', moveToChangeRole);
});
function moveToChangeRole(event) {
  event.preventDefault();
  const uid = event.target.id;

  fetch(`/api/user/admin/${uid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(response => {
    if (response.ok) {
      window.location.href = `/api/user/admin/6535d11650469334680883f8`;
    } else {
      throw new Error('Error al ir a modificar rol');
    }
  })
  .catch(error => {
    alert(error.message);
  });
}

//LOGICA PARA EL FORMULARIO CAMBIAR ROL
const changeUserForm = document.getElementById('update-role-user-form');
changeUserForm &&
changeUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newRole = document.getElementById('newRole').value.toString();

  const userEmail = document.getElementById('userEmail').value;

  try {
    const response = await fetch(`/api/user/byemail/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const uid = await response.json();

      const updateResponse = await fetch(`/api/user/admin/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newRole }),
      });

      if (updateResponse.ok) {
        console.log('Rol de usuario actualizado con éxito', newRole);
        document.getElementById('newRole').value = '';
        document.getElementById('userEmail').value = '';
      } else {
        console.error('Error al actualizar el rol del usuario:', updateResponse.statusText);
      }
    } else {
      console.error('Error al obtener el ID del usuario:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});

//LOGICA PARA QUE EL ADMINISTRADOR ELIMINE UN USUARIO
document.querySelectorAll('.button-delete-user').forEach(button => {
  button.addEventListener('click', deleteUser);
});

  function deleteUser(event) {
  event.preventDefault();
  const uid = event.target.id;
  
  fetch(`/api/user/${uid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
    return response.json();
  })
  .then(data => {
    console.log("Usuario eliminado");
    window.location.reload();
  })
  .catch(error => {
    console.log('Error:', error);
    
  });
}