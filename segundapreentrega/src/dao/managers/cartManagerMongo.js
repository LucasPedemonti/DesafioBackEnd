import {cartModel} from "../models/carts.model.js"

class CartManager {


    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    };
    

    getCartById = async (cartId) => {

        try {
            const cart = await cartModel.findById(cartId)

            return cart;
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    };
    

    addCart = async () => {
        try {
            // let cartData = {};
            // if (products && products.length > 0) {
            //     cartData.products = products;
            // }
            // const cart = await cartModel.create(cartData);
            const cart = await cartModel.create({});
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    };
    

    addProductInCart = async (cart_id, prod_id) => {
        try {
            //VERIFICACION DE EXISTENCIA DE CARRITO Y PRODUCTO
            // const cart = await cartsModel.findOne({_id: cart_id}).lean(); //OLD
            const cart = await cartModel.findOne({_id: cart_id});
            //const product = await productsModel.findOne({_id: prod_id});
            //BUSCO SI EL PRODUCTO YA EXISTE EN EL CARRITO
            console.log(cart.products[0]);
            const existProduct = cart.products.find( elem => elem.product.toString() === prod_id);
            if(existProduct) {
                existProduct.quantity++;
            }else {
                // console.log("el producto NO existe")
                cart.products.push({
                    product: prod_id, quantity: 1
                })
            }
            //HACEMOS SAVE() DE LO EDITADO
            await cart.save();
            //RETORNAMOS EL CART ACTUALIZADO
            return cart;
        } catch (error) {
            console.log("Error in addProductToCart()", error);
            return error;
        }
        // try {
        //     const filter = { _id: cid, "products._id": obj._id };
        //     const cart = await cartModel.findById(cid);
        //     const findProduct = cart.products.some((product) => product._id.toString() === obj._id);
    
        //     if (findProduct) {
        //         const update = { $inc: { "products.$.quantity": obj.quantity } };
        //         await cartModel.updateOne(filter, update);
        //     } else {
        //         const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
        //         await cartModel.updateOne({ _id: cid }, update);
        //     }
    
        //     return await cartModel.findById(cid);
        // } catch (err) {
        //     console.error('Error al agregar el producto al carrito:', err.message);
        //     return err;
        // }
    };
    deleteProductInCart = async (cid, products) => {
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { products },
                { new: true })

        } catch (err) {
            return err
        }

    }
    updateOneProduct = async (cid, products) => {
        
        await cartModel.updateOne(
            { _id: cid },
            {products})
        return await cartModel.findOne({ _id: cid })
    }



};

export default CartManager;