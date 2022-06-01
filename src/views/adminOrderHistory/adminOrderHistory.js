import * as Api from '../api.js';

const ordersItemContainer = document.querySelector('.orders-item-container');

const orders = await Api.get('/order/orderlist');

orders.forEach((order) => {
  const dateText = order.createdAt.split('T')[0];
  let orderedProduct = ``;
  let totalQuantity = 0;
  let totalPrice = 0;

  order.orderList.forEach((order) => {
    const { bookName, quantity, price } = order;
    orderedProduct += `<div class="item-book">${bookName} ${String(quantity)}개</div>`
    totalQuantity += Number(quantity);
    totalPrice += Number(price);
    });

  const element = `
  <div class="order-item">
      <div class="item-date">${dateText}</div>
      <div>
        ${orderedProduct}
      </div>
      <div>${totalQuantity}개</div>
      <div class="item-quantity">${totalPrice}원</div>
      <div class="item-status">상품 준비중</div>
      <div class="item-delete-request">
          <div class="delete-btn">주문 취소</div>
      </div>
  </div>
`;

  ordersItemContainer.insertAdjacentHTML('beforeend', element);

});

// 주문 취소
const orderItem = document.querySelectorAll('.order-item');
const deleteBtn = document.querySelectorAll('.delete-btn');

deleteBtn.forEach((node, i) => {
  node.addEventListener('click', async () => {
    const res = await Api.delete(`/order/orders/${orders[i]._id}`);
    alert('주문이 취소되었습니다.');

    orderItem[i].remove();
  });
});