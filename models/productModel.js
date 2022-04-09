const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    oldPrice: {
      type: Number,
      require: false,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      require: true,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
