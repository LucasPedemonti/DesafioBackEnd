import { productService,userService } from "../repositories/services.js";
import { sendEmailToPremium } from "../services/mailing.js";
import notifier from "node-notifier";



//CREAR PRODUCTO
const createProduct = async (req, res) => {
  const productData = req.body;
  const user = req.user; 
  try {
      if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.stock) {
      throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
    }
    productData.owner = user.user.user.email;

    await productService.createProduct(productData);
    res.send(productData);
  } catch (error) {
      res.status(500).json({ message: "Error al crear el producto." });
   }
};
  
 ////OBTENER TODOS LOS PRODUCTOS////*** */
   ////OBTENER TODOS LOS PRODUCTOS////*** */
   const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    const user = req.user;
    const cartId = req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditButton = userRole === 'admin';
    res.render('product', { products: products, user: user, cartId: cartId, showEditButton });
  };
  
  
////OBTENER UN PRODUCTO////*** */
const getProductById = async (req, res) => {
  const pid = req.params.pid;
  try{
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('product-detail', productById);

  } catch (error) {
  res.status(500).json({ message: "Error obtener un producto." });
  }
};

////OBTENER TODOS LOS PRODUCTOS, LOS MUESTRA AL ADMIN////*** */
const getAllProductsForAdmin = async (req, res) => {
  const user=req.user; 
  try{
    const products = await productService.getAllProducts();
    res.render('update-products', { products: products,user:user });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos." });
    }
  };


////OBTENER UN PRODUCTO, LOS MUESTRA AL ADMIN////*** */
const getProductByIdForAdmin = async (req, res) => {
  const pid = req.params.pid;
  try{
    const productById = await productService.getProductById(pid);
    productById._id = productById._id.toString();
    res.render('update-one-product', productById );
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto." });
    }
  };
  
    ////ACTUALIZA UN PRODUCTO////
    const updateProduct = async (req, res) => {
      const  pid  = req.params.pid;
      const productToUpdated = req.body;
      try{
        const productUpdated = await productService.updateProduct(pid, productToUpdated);
        notifier.notify({
          title: 'Exito',
          message: 'Producto actualizado',
        });
        res.send(productUpdated);
      } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto." });
        }
      };
    
    //GUARDAR LA IMAGEN DE UN PRODUCTO
  const uploadImageProduct = async (req, res) => {
    try {
      const productId = req.params.pid; 
      const imagePath = req.file.path;
      await productService.uploadImageProduct(productId,imagePath);
         
      notifier.notify({
        title: 'Imagen del producto',
        message: 'Tu imagen fue agregada al prodcuto',
      });
         res.redirect(303, `/api/updateproducts`);
    } catch (error) {
      
      res.status(500).json({ error: 'Error interno del servidor al subir la imagen de producto' });
    }
     
  };
  
    ////ELIMINA UN PRODUCTO////**** */
    const deleteProduct = async (req, res) => {
      const { pid } = req.params;
      const { user } = req;
      try {
        const product = await productService.getProductById(pid);
    
        if (user.user.user.role === 'admin' || (user.user.user.role === 'premium' && product.owner === user.user.user.email)) {
          const productDeleted = await productService.deleteProduct(pid);
  
          if (user.user.user.role === 'admin' && product.owner !== user.user.user.email) {
            await sendEmailToPremium(product.owner); 
            console.log(`Correo enviado a ${product.owner} sobre la eliminación del producto.`);
          }
    
          notifier.notify({
            title: 'Exito',
            message: 'Producto eliminado.'
          });
    
          res.send(productDeleted);
        } else {
          notifier.notify({
            title: 'Permiso denegado',
            message: 'No tienes permiso para eliminar este producto.'
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor.');
      }
    };
    
     
   
  export {createProduct,getAllProducts,getProductById, deleteProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin,uploadImageProduct}