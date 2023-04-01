const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          typr: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          required: true,
          default: 0
        },
      },
    ],
    default: [],
  },
})

const cartModel = mongoose.model("Carts", cartSchema);

module.exports = cartModel;
