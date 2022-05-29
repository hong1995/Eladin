import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    orderList: [
      new mongoose.Schema({
        bookName: String,
        quantity: Number,
        price: Number,
        productId: String,
      }),
    ],
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
