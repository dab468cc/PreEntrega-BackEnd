const router = require("express").Router()
const CartManager = require("../dao/mongo/cartManager.mongo")

const cartManager = new CartManager()

router.post("/",async (req,res) => {
    try {
        await cartManager.addCart()

        res.status(200).json({message: "Cart added"})
    } catch (error) {
        console.log("🚀 ~ file: cart.routes.js:11 ~ router.get ~ error:", error)
    }
})

router.get("/:cid",async (req,res) => {
    try {
        
        const cart = cartManager.getProductsByCartId(req.params.cid)

        res.status(200).render("cart",{ cart })
    } catch (error) {
        console.log("🚀 ~ file: cart.routes.js:22 ~ router.get ~ error:", error)
    }
})


router.post("/:cid/products:/pid",async (req,res) => {
    try {
        await cartManager.addProductToCart(req.params.cid,req.params.pid)
        res.status(200).json({message: "Product added",addProduct})
    } catch (error) {
        console.log("🚀 ~ file: cart.routes.js:32 ~ router.get ~ error:", error)
    }
})

router.delete("/:cid/products/:pid",async (req,res) => {
    try {
        await cartManager.deleteProductFormCart(req.params.cid,req.params.pid)

        res.status(200).json({
            message: "Product deleted"
        })
    } catch (error) {
        console.log("🚀 ~ file: auth.routes.js:44 ~ router.post ~ error:", error);
    }
})


router.put("/:cid/products/:pid",async (req,res) => {
    try {
        await cartManager.updateQuantity(req.params.cid,req.params.pid)

        res.status(200).json({
            message: "Quantity updare"
        })
    } catch (error) {
        console.log("🚀 ~ file: auth.routes.js:57s ~ router.post ~ error:", error);
    }
})

router.delete("/:cid",async (req,res) => {
    try {
        await cartManager.deleteProducts(req.params.cid)

        res.status(200).json({
            message: "Cart empty"
        })
    } catch (error) {
        
    }
})


module.exports = router