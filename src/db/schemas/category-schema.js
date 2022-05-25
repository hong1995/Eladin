const { Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

export { CategorySchema };