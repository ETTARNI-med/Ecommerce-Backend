import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    _id: Schema.Types.UUID,
    subcategory_name: {
      type: String,
      require: true,
      min: 2,
      max: 60,
    },
    category_id: {
      type: String,
      require: true,
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

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
