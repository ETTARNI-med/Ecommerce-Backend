import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _id: Schema.Types.UUID,
    sku: {
      type: String,
      require: true,
    },
    product_image: {
      type: String,
      default: "",
    },
    product_name: {
      type: String,
      require: true,
      min: 2,
      max: 60,
    },
    subcategory_id: {
      type: String,
      require: true,
    },
    short_description: {
      type: String,
      require: true,
      max: 20,
    },
    long_description: {
      type: String,
      require: true,
      min: 25,
    },
    price: {
      type: Schema.Types.Decimal128,
      require: true,
    },
    discount_price: {
      type: Schema.Types.Decimal128,
      require: true,
    },
    options: {
      type: [String],
      default: [],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
