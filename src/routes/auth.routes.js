const router = require("express").Router()

const userModel = require("../dao/models/user.model")
const isLogged = require("../middlewares/auth")

router.get("/reguister", async (req,res) => {
    try {
        const {userName,email,password,role} = req.body

        const userExist = userModel.findOne({email})

        if(userExist)
        return res.status(404).json({
            message:"Email alrady registred"
        })

        const creatUser = await userModel.create({
            userName,
            email,
            password,
            role,
        })

        res.redirect("/login")
    } catch (error) {
        console.log("🚀 ~ file: auth.routes.js:25 ~ router.get ~ error:", error);
    }
})

router.get("/login",async (req,res) => {
    try {
        const {password,email} = req.body
        const userExist = await userModel.findOne({email}).lean()

        if(!userExist)
        return res.status(404).json({
            message: "User not found"
        })

        if(userExist.password != password)
        return res.status(409).json({
            message: "invalid password"
        })
        
        req.session.user = userExist

        res.redirect("/api/products")

    } catch (error) {
        console.log("🚀 ~ file: auth.routes.js:49 ~ router.post ~ error:", error);
    }
})

router.get("/logout",async (req,res) => {
    try {
        req.session.destroy((err) => {
            if(err) res.status(200).redirect("/login")
        })
    } catch (error) {
        console.log("🚀 ~ file: auth.routes.js:60 ~ router.post ~ error:", error);
    }
})

module.exports = router