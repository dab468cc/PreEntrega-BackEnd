const productsModel = require("../models/product.model")

class ProductManager {
  getProduct = async () => {
    try {
      const products = await productsModel.find({})
      return products
    } catch (error) {
        console.log(
        "🚀 ~ file: productManager.mongo.js:7 ~ ProductManageR ~ getProduct= ~ error:",
        error
      );
    }
  }

  getProductById = async (id) => {
    try {
      const product = await productsModel.find({_id: id}).lean()
      return product
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:20 ~ ProductManager ~ getProductById= ~ error:",
        error
      );
    }
  }

  addProduct = async (product) => {
    try {
      const addproduct = await productsModel.create(product)
      
      return await this.getProduct()
    } catch (error) {
        console.log(
        "🚀 ~ file: productManager.mongo.js:33 ~ ProductManager ~ addProduct= ~ error:",
        error
      );
    }
  }

  updateProduct = async (pid,newData) => {
    try {
      const findAndUpdate = await productsModel.findByIdAndUpdate(pid,{...newData})

      return await this.getProductById(pid)
    } catch (error) {
        console.log(
        "🚀 ~ file: productManager.mongo.js:46 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  }

  deleteProduct = async (pid) => {
    try {
      const deleteProduct = await productsModel.findByIdAndDelete(pid)

      return deleteProduct
    } catch (error) {
      console.log(
        "🚀 ~ file: productManager.mongo.js:59 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  }
  
}

module.exports = ProductManager;