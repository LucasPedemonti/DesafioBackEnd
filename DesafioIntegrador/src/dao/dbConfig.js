import mongoose from "mongoose"

const URI="mongodb+srv://lucaspedemonti91:lpdev@cluster0.h7kvhpc.mongodb.net/Ecommerce?retryWrites=true&w=majority"

await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})

console.log("Base de datos conectada...");