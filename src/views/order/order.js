import * as Api from '../api.js';
import { getAllDB } from '../indexedDB.js';
import { validator } from '.././useful-functions.js';

// indexedDB에 담아놓은 책들 가져오기
const books = await getAllDB('buy');

// 결제 정보 표시
const orderCount = document.querySelector('#orderCount');
const priceText = document.querySelector('#price');
const totalPriceText = document.querySelector('#total-price');

let count = 0;
let booksPrice = 0;

books.forEach((book) => {
  count += book.quantity;
  booksPrice += book.price * book.quantity;
});

orderCount.innerText = `${count}개`;
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

  const arr = [
    receiverName,
    receiverPhoneNumber,
    receiverAddress1,
    receiverAddress2,
    receiverPostalCode,
  ];

  if (validator(arr, receiverPhoneNumber)) {
    const user = await Api.get('/api/user');
    const orderList = [];

    books.forEach((book) => {
      const obj = {
        bookName: book.bookName,
        quantity: book.quantity,
        price: book.price,
        productId: book._id,
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
    console.log(info);
    await Api.post('/order/register', info);

    // location.href = '/orderComplete';
  }
}
