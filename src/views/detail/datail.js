import * as Api from '../api.js';
import { createDB, writeDB } from '../indexedDB.js';

const receivedId = location.href.split('?')[1];
const bookContainer = document.querySelector('.book-container');

const book = await Api.get(`/product/${receivedId}`);
console.log(book);

const { bookName, author, publisher, price, info, imageUrl } = book;

const element = `
  <img src=${imageUrl} class="book-img" alt=${bookName}>
  <div class="book-info">
    <div>
      <p class="title">${bookName}</p>
      <p class="author">저자: ${author}</p>
      <p class="publisher">출판사: ${publisher}</p>
      <p class="price">판매가: ${price}</p>
    </div>
    <hr>
    <div class="book-introduction">
      <p class="intro-title">책 소개</p>
      <p class="intro-content">${info}</p>
    </div>
  </div>
  `;

bookContainer.insertAdjacentHTML('beforeend', element);

// 장바구니, 바로구매 - indexedDB에 현재 상품 데이터 추가
const addCartBtn = document.querySelector('.add-cart');
const buyBtn = document.querySelector('.buy');
addCartBtn.addEventListener('click', addDB);
buyBtn.addEventListener('click', addDB);

function addDB(e) {
  const dbName = e.target.className.split(' ')[0];

  createDB(dbName);
  writeDB(dbName, book);
}