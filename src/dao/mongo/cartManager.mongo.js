const cartModel = require("../models/cart.model")
const productsModel = require("../models/product.model")

class CartManager {
  addCart = async () => {
    try {
      await cartModel.create({})
    } catch (error) {
      console.log("🚀 ~ file: cartManager.mongo.js:8 ~ CartManager ~ getCarts= ~ error:",error);
    }
  }

  getProductsByCartId = async (cid) => {
    try {
      const cart = cartModel.findById(cid).populate("products.product").lean()
      return cart
    } catch (error) {
      console.log("🚀 ~ file: cartManager.mongo.js:23 ~ CartManager ~ getCarts= ~ error:",error);
    }
  }


  addProductToCart = async (cid,pid) => {
    try {
      const cart = await cartModel.findById(cid)
      
      cart.products.push({product:pid})
      cart.save()
      return cart
    } catch (error) {
      console.log(
        "🚀 ~ file: cartManager.mongo.js:30 ~ CartManager ~ addProductToCart=async ~ error:",
        error
      );
    }
  }

  deleteProductFormCart = async (cid,pid) => {
    try {
      const updateCart = cartModel.findByIdAndUpdate(cid,{
        $pull:{ products: {_id: pid}},
      })
    } catch (error) {
      console.log("🚀 ~ file: cartManager.mongo.js:43 ~ CartManager ~ getCarts= ~ error:",error);
    }
  }

  deleteProducts = async (cid) => {
    const cart = cartModel.findOneAndUpdate(cid,{$pull: {products:{}}})
  }

  updateQuantity = async (cid,pid,quantity) => {
    try {
      const cart = await cartModel.findById(cid)
      const product = cart.products.find(
        (element) => element._id.toString()===pid
      )
      product.quantity += quantity

      cart.save()
    } catch (error) {
      console.log("🚀 ~ file: cartManager.mongo.js:61 ~ CartManager ~ getCarts= ~ error:",error);
    }
  }
}

module.exports = CartManager;