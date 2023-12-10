import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  _id: String,
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String, 
  profileImage: { type: String, default: 'public/image/avatar.png' }, // Ruta de la imagen de perfil
  last_connection: { type: Date,default:null },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
  role: { type: String, default: 'user' },
  documents: [
    {
      name: String,
      reference: String,
    }
  ],
});


const User = mongoose.model(userCollection, userSchema);

export default User;