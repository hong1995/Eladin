import * as Api from '../api.js';
import { getAllDB, clearAllDB } from '../indexedDB.js';

// indexedDB에 담아놓은 책들 가져오기
const books = await getAllDB('buy');
console.log(books);

// 결제 정보 표시
const priceText = document.querySelector('#price');
const totalPriceText = document.querySelector('#total-price');

const booksPrice = books.reduce((acc, cur) => acc + cur.price, 0);
priceText.innerText = `${booksPrice}원`;
totalPriceText.innerText = `${booksPrice + 3000}원`;

// 구매하기 버튼 클릭 시
const purchaseButton = document.querySelector('#purchaseButton');
purchaseButton.addEventListener('click', purchase);

async function purchase() {
  const receiverName = document.querySelector('#receiverName').value;
  const receiverPhoneNumber = document.querySelector(
    '#receiverPhoneNumber'
  ).value;
  const receiverAddress1 = document.querySelector('#receiverAddress1').value;
  const receiverAddress2 = document.querySelector('#receiverAddress2').value;
  const receiverPostalCode = document.querySelector(
    '#receiverPostalCode'
  ).value;

  const user = await Api.get('/api/user');
  const orderList = [];

  books.forEach((book) => {
    const obj = {
      bookName: book.bookName,
      quantity: 1,
      price: book.price,
    };

    orderList.push(obj);
  });

  const info = {
    orderList: orderList,
    email: user.email,
    fullName: receiverName,
    phoneNumber: receiverPhoneNumber,
    address1: receiverAddress1,
    address2: receiverAddress2,
    postalCode: receiverPostalCode,
  };

  await Api.post('/order/register', info);

  location.href = `/orderComplete`;
}
