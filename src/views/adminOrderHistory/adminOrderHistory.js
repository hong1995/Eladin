import * as Api from '../api.js';

const paginationBtn = document.querySelectorAll('.pagination-link');
paginationBtn.forEach((btn) => btn.addEventListener('click', pagination));

const previous = document.querySelector('#previous');
const nextBtn = document.querySelector('#nextBtn');

let currentButtonPageNum = 0;
let totalPageNum = 0;
await drawAdminOrderHistory(1);

console.log(totalPageNum)
let totalButtonPageNum = Math.floor(totalPageNum/5)
console.log(totalButtonPageNum);

if ( currentButtonPageNum === totalButtonPageNum ) {
  paginationBtn.forEach((btn) => {
    if (Number(btn.innerText) > totalPageNum) {
      btn.style.visibility = 'hidden';
    }
  });
}

async function drawAdminOrderHistory(pageNo){
  const ordersItemContainer = document.querySelector('.orders-item-container');
  ordersItemContainer.innerHTML= ``;
  const {ordersList} = await Api.get(`/order/orderlist?pageno=${pageNo}`);
  const {orderList, totalPage} = ordersList;
  orderList.forEach((order) => {
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
  const deleteBtn = document.querySelectorAll('.delete-btn');
  const orderItem = document.querySelectorAll('.order-item')

  deleteBtn.forEach((node, i) => {
    node.addEventListener('click', async () => {
      const res = await Api.delete(`/order/orders/${orderList[i]._id}`);
      alert('주문이 취소되었습니다.');

      orderItem[i].remove();
    });
  });

  totalPageNum = totalPage;
}

// const paginationList = document.querySelector('.pagination-list');
// const pagiationPrevious = document.getElementById('pagination-previous')



async function pagination(e) {
  const pageNumber = e.target.innerText;
  drawAdminOrderHistory(pageNumber);

  // 현재 페이지 버튼 색 변경
  paginationBtn.forEach((btn) => {
    btn.classList.remove('is-current');

    if (btn.innerText === pageNumber) {
      btn.classList.add('is-current');
    }
  });
}

async function currentButton(num) {
  const pageNum = [1, 2, 3, 4, 5];
  const buttonPageNum = pageNum.map(e => e + num*5)
  paginationBtn.forEach((btn, i) => btn.innerHTML = buttonPageNum[i]);
}



//previous.addEventListener('click', minusPage);
nextBtn.addEventListener('click', plusPage);

async function plusPage() {
  if (currentButtonPageNum < totalButtonPageNum) {
    currentButtonPageNum += 1;
    
    paginationBtn.forEach((btn) => {
      btn.classList.remove('is-current');
    });
    
  }
  
  currentButton(currentButtonPageNum);
  
  if ( currentButtonPageNum === totalButtonPageNum ) {
    paginationBtn.forEach((btn) => {
      if (Number(btn.innerText) > totalPageNum) {
        btn.style.visibility = 'hidden';
      }
    });
  }
}

previous.addEventListener('click', minusPage);

async function minusPage() {
  if (currentButtonPageNum > 0) {
    currentButtonPageNum -= 1;
    
    paginationBtn.forEach((btn) => {
      btn.classList.remove('is-current');
      btn.style.visibility = 'visible';
    });
    
  } 
  currentButton(currentButtonPageNum); 

}