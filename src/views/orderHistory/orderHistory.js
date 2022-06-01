import * as Api from '../api.js';

const contentContainer = document.querySelector('.content-container');

const orders = await Api.get('/order/orders');

orders.forEach((order) => {
  console.log(order);
  const dateText = order.createdAt.split('T')[0];
  let element = null;

  // 한 주문에 상품 여러개일 때
  if (order.orderList.length > 1) {
    const nameText = order.orderList[0].bookName;
    const quantityText = order.orderList.reduce(
      (acc, cur) => acc + cur.quantity,
      0
    );
    const remainsCount = order.orderList.length - 1;

    element = `
    <div class="order-item">
        <div class="item-date">${dateText}</div>
        <div class="item-book">${nameText} 외 ${remainsCount}건</div>
        <div class="item-quantity">${quantityText}</div>
        <div class="item-status">상품 준비중</div>
        <div class="item-delete-request">
            <div class="delete-btn">주문 취소</div>
        </div>
    </div>
  `;
  } else {
    const { bookName, quantity } = order.orderList[0];

    element = `
    <div class="order-item">
        <div class="item-date">${dateText}</div>
        <div class="item-book">${bookName}</div>
        <div class="item-quantity">${String(quantity)}</div>
        <div class="item-status">상품 준비중</div>
        <div class="item-delete-request">
            <div class="delete-btn">주문 취소</div>
        </div>
    </div>
  `;
  }

  contentContainer.insertAdjacentHTML('beforeend', element);
});

// 주문 취소
const deleteBtn = document.querySelectorAll('.delete-btn');
const orderItem = document.querySelectorAll('.order-item');

deleteBtn.forEach((node, i) => {
  node.addEventListener('click', async () => {
    const res = await Api.delete(`/order/orders/${orders[i]._id}`);
    alert('주문이 취소되었습니다.');

    orderItem[i].remove();
  });
});
