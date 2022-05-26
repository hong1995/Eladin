import { Schema } from 'mongoose';

const ProductSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  /*imageUrl: {
      type: [String],
      require : true,
  },*/
  /*category: {
      type: Schema.Types.ObjectId,
      ref: 'categoryModel',
      required: true,
  },
  */
}, {
  collection: 'products',
  timestamps: true,
});

export { ProductSchema };
