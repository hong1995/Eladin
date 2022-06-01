import * as Api from '../api.js';
import {
  getAllDB,
  writeDB,
  updateDB,
  getDB,
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

books.forEach(async (book) => {
  const { _id, bookName, author, price, quantity, imageUrl } = book;

  let element = `
    <div class="listItem" data-id=${_id}>
      <div class="leftSpacer">
        <input type="checkbox" class="checkbox" checked="true">
      </div>
      <figure class="image is-96x96">
        <img src="${imageUrl}">
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

  // 체크박스 표시 여부 indexedDB에 저장
  book.checked = true;
  await updateDB('add-cart', _id, book);
});

const bookCount = document.querySelector('#bookCount');
const priceText = document.querySelector('#bookPrice');
const totalPriceText = document.querySelector('#bookTotalPrice');

// 결제 정보 업데이트
async function updatePaymentInfo() {
  const books = await getAllDB('add-cart');
  let count = 0;
  let booksPrice = 0;

  books.forEach((book) => {
    if (book.checked) {
      count += book.quantity;
      booksPrice += book.price * book.quantity;
    }
  });

  bookCount.innerText = `${count}개`;
  priceText.innerText = `${booksPrice}원`;
  totalPriceText.innerText = `${booksPrice + 3000}원`;
}

updatePaymentInfo();

const quantityMinus = document.querySelectorAll('.quantityMinus');
const quantityInput = document.querySelectorAll('.quantityInput');
const quantityPlus = document.querySelectorAll('.quantityPlus');
const itemQuantity = document.querySelectorAll('.itemQuantity');
const itemTotalPrice = document.querySelectorAll('.itemTotalPrice');

// 상품 정보 업데이트
function updateItemInfo(i, newBooks, quantity) {
  quantityInput[i].value = quantity;
  itemQuantity[i].innerText = quantity;
  itemTotalPrice[i].innerText = `${newBooks[i].price * quantity}원`;
}

// 버튼으로 수량 변경
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

// 입력받아 수량 변경
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

// 개별 체크박스 이벤트
const checkbox = document.querySelectorAll('.checkbox');

checkbox.forEach((node) => {
  node.addEventListener('click', async () => {
    const key = node.closest('.listItem').dataset.id;
    const newBook = await getDB('add-cart', key);

    newBook.checked = node.checked;
    await updateDB('add-cart', key, newBook);

    updatePaymentInfo();
  });
});

// 전체 선택
const selectAll = document.querySelector('.selectAll');

selectAll.addEventListener('click', (e) => {
  if (Array.from(checkbox).filter((node) => !node.checked).length > 0) {
    checkbox.forEach(async (node) => {
      const key = node.closest('.listItem').dataset.id;
      const newBook = await getDB('add-cart', key);

      newBook.checked = true;
      await updateDB('add-cart', key, newBook);

      node.checked = true;

      updatePaymentInfo();
    });
  } else {
    checkbox.forEach(async (node) => {
      const key = node.closest('.listItem').dataset.id;
      const newBook = await getDB('add-cart', key);

      newBook.checked = false;
      await updateDB('add-cart', key, newBook);

      node.checked = false;

      updatePaymentInfo();
    });
  }
});

// 선택 삭제
const selectDelete = document.querySelector('.selectDelete');

selectDelete.addEventListener('click', async () => {
  checkbox.forEach((node, i) => {
    if (node.checked) {
      deleteItem(node);
    }
  });
});

// 개별 삭제
const deleteButton = document.querySelectorAll('.deleteButton');

deleteButton.forEach((node) => {
  node.addEventListener('click', () => deleteItem(node));
});

async function deleteItem(node) {
  const key = node.closest('.listItem').dataset.id;

  await deleteDB('add-cart', key);
  node.closest('.listItem').remove();

  updatePaymentInfo();
}

// 구매하기
const purchaseButton = document.getElementById('purchaseButton');
purchaseButton.addEventListener('click', purchase);

async function purchase() {
  // cartDB에 담았던 상품들 buyDB로 이동
  const newBooks = await getAllDB('add-cart');
  const selectedItem = newBooks.filter((book) => book.checked);

  if (!selectedItem.length) {
    alert('선택된 상품이 없습니다.');
    return;
  }

  await createDB('buy');

  selectedItem.forEach((item) => {
    writeDB('buy', item);
  });

  location.href = '/order';
}
