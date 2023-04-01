const router = require("express").Router();
const productModel = require ("../dao/models/product.model")
const ProductManager = require("../dao/mongo/productManager.mongo");

const productManager = new ProductManager();


router.get("/", async (req, res) => {
  try {
    const {limit = 3, page = 1, query = null, sort = 1} = req.query;
    const products = await productManager.paginate(
      {},
      {lean:true , limit ,page}
    );

    res.status(200).render("products", { 
      status: "success",
      user: req.session.user,
      payload: products.docs,
      totalPages: products.totalDocs,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? "" : null,
      nextLink: products.hasNextPage ? "" : null,
     });
  } catch (error) {
    console.log("🚀 ~ file: products.routes.js:29 ~ router.get ~ error:", error);
  }
});

router.get("/filter",async (req,res) => {
  try {
    const {limit = 3, sort = 1} =req.query

    const products = await productModel.aggregate([
      {$sort:{price:sort}},
      {$limit:limit}
    ])

    res.status(200).render("products",{products})
  } catch (error) {
    
  }
})

//getProductById
router.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).render("home", { message: "Product not found" });
    }

    return res.status(200).render("product", { product });
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:59 ~ router.get ~ error:",
      error
    );
  }
});

//addProduct
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ message: "All are required" });
    }

    await productManager.addProduct(req.body);

    return res.status(200).json({ message: "Product added"});
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:78 ~ router.post ~ error:",
      error
    );
  }
});

//updateProduct
router.put("/:pid", async (req, res) => {
  try {
    await productManager.updateProduct(req.params.pid, req.body);

    return res.status(200).json({ message: "Product updated"});
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:93 ~ router.put ~ error:",
      error
    );
  }
});

//deleteProduct
router.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.pid);

    return res.status(200).json({ message: "Product deleted"});
  } catch (error) {
    console.log(
      "🚀 ~ file: products.routes.js:107 ~ router.delete ~ error:",
      error
    );
  }
});

module.exports = router;
