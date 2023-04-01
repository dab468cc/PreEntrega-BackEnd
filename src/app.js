const express = require("express")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const handlebars = require("express-handlebars");
const path = require("path");
const { Server } = require("socket.io");

const routerAuth = require("./routes/auth.routes")
const routerProducts = require("./routes/products.routes")
const routercarts = require("./routes/cart.routes")
const routerchat = require("./routes/chat.routes")

const ProductManager = require("./dao/mongo/productManager.mongo")

const productModel = require("./dao/models/product.model")

require('dotenv').config()

const {DB_USER,DB_PASS} = process.env

const productManager = new ProductManager

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,() => console.log(`Server listening on port ${PORT}`))

const socketServer = new Server(httpServer)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        store:MongoStore.create({
            mongoUrl:`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ypqhimi.mongodb.net/?retryWrites=true&w=majority`,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 60 * 360,
        }),
        secret: "C0d3rBack",
        resave:false,
        saveUninitialized: false,
    })
)

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", routerAuth);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/api/messages", routerMessages);

app.get("/realtimeproducts", async (req, res) =>
  res.status(200).render("realTimeProducts")
);

socketServer.on("connection", async (socket) => {
  console.log("New client connected");

  const products = await productModel.find({});
  socket.emit("products", products);

  socket.on("addProd", async (prod) => await productManager.addProduct(prod));

  socket.on("delProd", async (id) => await productManager.deleteProduct(id));
});

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ypqhimi.mongodb.net/?retryWrites=true&w=majority`
);
