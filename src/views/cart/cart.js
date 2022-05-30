import * as Api from '../api.js';
import {
  getAllDB,
  writeDB,
  updateDB,
  deleteDB,
  createDB,
} from '../indexedDB.js';

// 주문한 상품은 indexedDB에서 제거 후 가져옴
const orderedBook = await Api.get('/order/orders');
const orderBookId = orderedBook
  .map((order) => order.orderList.map((list) => list.productId))
  .flat();

let books = await getAllDB('add-cart');

books.forEach((book) => {
  if (orderBookId.includes(book._id)) {
    deleteDB('add-cart', book._id);
  }
});

books = await getAllDB('add-cart');

// 상품 목록 표시
const listContainer = document.querySelector('.listContainer');

books.forEach((book) => {
  const { bookName, author, price, quantity } = book;

  let element = `
    <div class="listItem">
      <div class="leftSpacer">
        <input type="checkbox" class="checkbox">
      </div>
      <figure class="image is-96x96">
        <img src="https://bulma.io/images/placeholders/96x96.png">
      </figure>
      <div class="contents">
        <p>${bookName}</p>
        <p>${author}</p>
        <div class = "quantity">
            <button class = "quantityMinus">-</button>
            <input class = "quantityInput" type="text" value=${quantity}>
            <button class = "quantityPlus">+</button>
        </div>
      </div>
      <div class = "calculation">
        <p class="itemPrice">${price}</p>
        <p>X</p>
        <p class="itemQuantity">${quantity}</p>
        <p>=</p>
        <p class="itemTotalPrice">${price * quantity}원</p>
      </div>
      <div class="rightSpacer">
        <button class="delete deleteButton"></button>
      </div>
    </div>
  `;

  listContainer.insertAdjacentHTML('beforeend', element);
});

const bookCount = document.querySelector('#bookCount');
const priceText = document.querySelector('#bookPrice');
const totalPriceText = document.querySelector('#bookTotalPrice');

// 결제 정보 업데이트
async function updatePaymentInfo() {
  const books = await getAllDB('add-cart');

  bookCount.innerText = `${books.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  )}개`;

  let booksPrice = books.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  priceText.innerText = `${booksPrice}원`;

  let totalPrice = booksPrice + 3000;
  totalPriceText.innerText = `${totalPrice}원`;
}

updatePaymentInfo();

// 수량 조정
const quantityMinus = document.querySelectorAll('.quantityMinus');
const quantityInput = document.querySelectorAll('.quantityInput');
const quantityPlus = document.querySelectorAll('.quantityPlus');
const itemQuantity = document.querySelectorAll('.itemQuantity');
const itemTotalPrice = document.querySelectorAll('.itemTotalPrice');

// 상품 정보 업데이트
function updateItemInfo(i, newBooks, quantity) {
  console.log(quantityInput, i);
  quantityInput[i].value = quantity;
  itemQuantity[i].innerText = quantity;
  itemTotalPrice[i].innerText = `${newBooks[i].price * quantity}원`;
}

// 버튼으로 조정
quantityMinus.forEach((node, i) => {
  node.addEventListener('click', (e) => quantityBtnClick(e, i));
});

quantityPlus.forEach((node, i) => {
  node.addEventListener('click', (e) => quantityBtnClick(e, i));
});

async function quantityBtnClick(e, i) {
  const newBooks = await getAllDB('add-cart');
  let quantity = newBooks[i].quantity;

  if (e.target.innerText === '-') {
    if (quantity > 1) {
      quantity--;
    }
  } else {
    quantity++;
  }

  updateItemInfo(i, newBooks, quantity);

  newBooks[i].quantity = quantity;
  await updateDB('add-cart', newBooks[i]._id, newBooks[i]);

  updatePaymentInfo();
}

// 입력받아 조정
quantityInput.forEach((node, i) => {
  node.addEventListener('change', (e) => quantityInputEvent(e, i));
});

async function quantityInputEvent(e, i) {
  const newBooks = await getAllDB('add-cart');
  let quantity = Number(e.target.value);

  updateItemInfo(i, newBooks, quantity);

  newBooks[i].quantity = quantity;
  await updateDB('add-cart', newBooks[i]._id, newBooks[i]);

  updatePaymentInfo();
}

// 개별 삭제
const deleteButton = document.querySelectorAll('.deleteButton');

deleteButton.forEach((node) => {
  node.addEventListener('click', () => deleteItem(node));
});

async function deleteItem(node) {
  const listItem = document.querySelectorAll('.listItem');

  const newBooks = await getAllDB('add-cart');
  const key = newBooks.map((book) => book._id);

  let index = Array.from(listItem).indexOf(node.closest('.listItem'));

  node.closest('.listItem').remove();
  await deleteDB('add-cart', key[index]);
  key.splice(index, 1);

  updatePaymentInfo();
}

// 전체 선택
const selectAll = document.querySelector('.selectAll');
const checkbox = document.querySelectorAll('.checkbox');

selectAll.addEventListener('click', () => {
  checkbox.forEach((node) => (node.checked = !node.checked));
});

// 선택 삭제
const selectDelete = document.querySelector('.selectDelete');

selectDelete.addEventListener('click', () => {
  checkbox.forEach((node, i) => {
    const listItem = document.querySelectorAll('.listItem');

    if (node.checked) {
      deleteDB('add-cart', books[i]._id);
      listItem[i].remove();

      updatePaymentInfo();
    }
  });
});

// 구매하기 - 장바구니 정보 업데이트
const purchaseButton = document.getElementById('purchaseButton');
purchaseButton.addEventListener('click', purchase);

async function purchase() {
  // cartDB에 담았던 상품들 buyDB로 이동
  await createDB('buy');

  for (const book of books) {
    await writeDB('buy', book);
  }

  location.href = '/order';
}
