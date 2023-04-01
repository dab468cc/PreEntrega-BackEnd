const isLogged = (req,res,next) => {
    try {
        if(req.session?.user) return next

        return res.redirect("/login")
    } catch (error) {
        console.log("🚀 ~ file: auth.js:6 ~ isLogged ~ error:", error);
    }
}

module.exports = isLogged