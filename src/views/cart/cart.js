import * as Api from '../api.js';
import { getAllDB, writeDB, createDB } from '../indexedDB.js';

// indexedDB에 담아놓은 책들 가져오기
const books = await getAllDB('add-cart');
console.log(books);

// 결제 정보 표시
const priceText = document.querySelector('#bookPrice');
const totalPriceText = document.querySelector('#bookTotalPrice');

const booksPrice = books.reduce((acc, cur) => acc + cur.price, 0);
priceText.innerText = `${booksPrice}원`;
totalPriceText.innerText = `${booksPrice + 3000}원`;

// 상품 목록 표시
const listContainer = document.querySelector('.listContainer');

books.forEach((book) => {
  const { bookName, author, price } = book;

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
            <button class = "button">-</button>
            <input class = "quantityInput" type="text">
            <button class = "button">+</button>
        </div>
      </div>
      <div class = "calculation">
        <p>${price}원</p>
        <p>X</p>
        <p>1</p>
        <p>=</p>
        <p>${price}원</p>
      </div>
      <div class="rightSpacer">
        <button class="delete deleteButton"></button>
      </div>
    </div>
  `;

  listContainer.insertAdjacentHTML('beforeend', element);
});

const purchaseButton = document.getElementById('purchaseButton');
purchaseButton.addEventListener('click', purchase);

async function purchase() {
  // cartDB에 담았던 상품들 buyDB로 옮기기
  await createDB('buy');
  for (const book of books) {
    await writeDB('buy', book);
  }

  location.href = '/order';
}
