import * as Api from '../api.js';

const purchaseButton = document.querySelector('#purchaseButton');
purchaseButton.addEventListener('click', purchase);

// 구매하기 버튼 클릭 시
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
  const receiverRequest = document.querySelector('#receiverRequest').value;

  const info = {
    orderList: [],
    email: 'abc@abc.com',
    fullName: receiverName,
    phoneNumber: receiverPhoneNumber,
    address1: receiverAddress1,
    address2: receiverAddress2,
    postalCode: receiverPostalCode,
  };

  await Api.post('/order/register', info);

  location.href = '/orderComplete';
}

// indexedDB에서 구매할 상품 정보 가져오기
const indexedDB = window.indexedDB;
const request = indexedDB.open('buyDB');

request.onsuccess = (e) => {
  let db = e.target.result;
  console.log('success is called');

  let transaction = db.transaction('product');

  transaction.oncomplete = (e) => {
    console.log('done');
  };

  transaction.onerror = (e) => {
    console.log('fail');
  };

  let objectStore = transaction.objectStore('product');
  const request = objectStore.getAll();
  request.onsuccess = (e) => {
    let item = e.target.result[0];

    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    const totalPrice = document.querySelector('#total-price');

    name.innerText = item.bookName;
    price.innerText = `${item.price}원`;
    totalPrice.innerText = `${item.price + 3000}원`;
  };
};

request.onerror = (e) => {
  console.error('indexedDB : ', e.target.errorCode);
};
