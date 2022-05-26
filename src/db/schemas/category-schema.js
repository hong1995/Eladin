import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    }
  },
  {
    collection: 'categories',
    timestamps: flase,
  }
);

export { CategorySchema };