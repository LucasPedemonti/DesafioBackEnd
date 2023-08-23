import mongoose from "mongoose"

const URI="mongodb+srv://lucaspedemonti91:lpdev@cluster0.h7kvhpc.mongodb.net/ecommerce"

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB