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

console.log(books);
// 상품 목록 표시
const listContainer = document.querySelector('.listContainer');

books.forEach((book) => {
  const { bookName, author, price, quantity } = book;

  let element = `
    <div class="listItem">
      <div class="leftSpacer">
        <label class="checkbox">
            <input type="checkbox">
        </label>
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

// 결제 정보 표시
const bookCount = document.querySelector('#bookCount');
const priceText = document.querySelector('#bookPrice');
const totalPriceText = document.querySelector('#bookTotalPrice');

bookCount.innerText = `${books.reduce((acc, cur) => acc + cur.quantity, 0)}개`;

let booksPrice = books.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
priceText.innerText = `${booksPrice}원`;

let totalPrice = booksPrice + 3000;
totalPriceText.innerText = `${totalPrice}원`;

// 수량 조정
const quantityMinus = document.querySelectorAll('.quantityMinus');
const quantityInput = document.querySelectorAll('.quantityInput');
const quantityPlus = document.querySelectorAll('.quantityPlus');
const itemQuantity = document.querySelectorAll('.itemQuantity');
const itemPrice = document.querySelectorAll('.itemPrice');
const itemTotalPrice = document.querySelectorAll('.itemTotalPrice');

// 버튼으로 조정
quantityMinus.forEach((node, i) => {
  node.addEventListener('click', (e) => quantityBtnClick(e, i));
});

quantityPlus.forEach((node, i) => {
  node.addEventListener('click', (e) => quantityBtnClick(e, i));
});

function quantityBtnClick(e, i) {
  let totalQuantity = 0;
  let booksPrice = 0;

  itemTotalPrice.forEach((node) => {
    booksPrice += Number(node.innerText.replace(/원/g, ''));
  });

  quantityInput.forEach((item, i) => {
    totalQuantity += Number(quantityInput[i].value);
  });

  if (e.target.innerText === '-') {
    let quantity = Number(quantityInput[i].value) - 1;

    if (quantity > 0) {
      quantityInput[i].value = quantity;
      itemQuantity[i].innerText = quantity;
      itemTotalPrice[i].innerText = `${
        Number(itemPrice[i].innerText) * quantity
      }원`;

      totalQuantity--;
      booksPrice -= Number(itemPrice[i].innerText);
    }
  } else {
    let quantity = Number(quantityInput[i].value) + 1;

    quantityInput[i].value = quantity;
    itemQuantity[i].innerText = quantity;
    itemTotalPrice[i].innerText = `${
      Number(itemPrice[i].innerText) * quantity
    }원`;

    totalQuantity++;
    booksPrice += Number(itemPrice[i].innerText);
  }

  bookCount.innerText = `${totalQuantity}개`;
  priceText.innerText = `${booksPrice}원`;
  totalPriceText.innerText = `${booksPrice + 3000}원`;

  // indexedDB 수량 수정
  books[i].quantity = Number(quantityInput[i].value);
  updateDB('add-cart', books[i]._id, books[i]);
}

// 입력받아 조정
quantityInput.forEach((node, i) => {
  node.addEventListener('change', (e) => quantityInputEvent(node, i));
});

function quantityInputEvent(node, i) {
  let totalQuantity = 0;
  let booksPrice = 0;

  quantityInput.forEach((item, i) => {
    totalQuantity += Number(quantityInput[i].value);
  });

  itemQuantity[i].innerText = node.value;
  itemTotalPrice[i].innerText = `${Number(
    itemPrice[i].innerText * node.value
  )}원`;

  itemTotalPrice.forEach((node) => {
    booksPrice += Number(node.innerText.replace(/원/g, ''));
  });

  bookCount.innerText = `${totalQuantity}개`;
  priceText.innerText = `${booksPrice}원`;
  totalPriceText.innerText = `${booksPrice + 3000}원`;

  books[i].quantity = Number(quantityInput[i].value);
  updateDB('add-cart', books[i]._id, books[i]);
}

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
