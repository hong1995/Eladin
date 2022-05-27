import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  //email을 이용해 특정 주문 출력
  async findByEmail(email) {
    const order = await Order.findOne({ email });
    return order;
  }

  //Id를 이용해 특정 주문 출력
  async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  // 유저Id로 주문 찾기
  async findByUserId(userId) {
    const orders = await Order.find({ userId });
    return orders;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  async delete(orderId) {
    const filter = { _id: orderId };

    const deletedorder = await Order.findOneAndRemove(filter);
    return deletedorder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
