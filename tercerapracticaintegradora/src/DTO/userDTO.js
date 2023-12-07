export default class UserDTO {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.last_connection = user.last_connection;
  }
}

export function createUserDTO(reqUser) {
  if (!reqUser || !reqUser.first_name || !reqUser.email) {
    return null; 
  }
  const userDTO = new UserDTO(reqUser); 
  return userDTO;
} 