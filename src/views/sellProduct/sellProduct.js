import * as Api from '/api.js';
import { validator } from '../useful-functions.js';

const bookNameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const categoryInput = document.querySelector('#category');
const publisherInput = document.querySelector('#publisher');
const infoInput = document.querySelector('#info');
const priceInput = document.querySelector('#price');
const photo = document.querySelector('#photo');
const file = document.querySelector('.file');
const fileName = document.querySelector('.file-name');
const select = document.querySelector('.select');
const purchaseButton = document.querySelector('#purchaseButton');

photo.addEventListener('change', changeName);

purchaseButton.addEventListener('click', sell);

async function changeName() {
  fileName.innerHTML = photo.files[0].name;
}

async function sell(e) {
  e.preventDefault();

  //upload router
  const bookName = bookNameInput.value;
  const author = authorInput.value;
  const category = categoryInput.value;
  const publisher = publisherInput.value;
  const info = infoInput.value;
  const price = Number(priceInput.value);
  const img = new FormData();
  img.append('img', photo.files[0]);
  console.log(photo.files[0]);

  const arr = [bookName, author, category, publisher, price, info, photo.value];

  if (validator(arr, priceInput.value)) {
    try {
      const urlResult = await fetch('/upload/register/', {
        method: 'POST',
        body: img,
      });
      console.log(urlResult);
      const imageJson = await urlResult.json();

      const imageUrl = imageJson.url;

      console.log(price);
      const data = {
        bookName,
        author,
        category,
        publisher,
        price,
        info,
        imageUrl,
      };
      const result = await Api.post('/product/register', data);

      // location.href = '/adminBookList';
      console.log(result);
    } catch (e) {
      console.error(err.stack);
      alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
      );
    }
  }
}

async function getAllCategories() {
  const dropDownCategories = await Api.get('/category/list');
  dropDownCategories.forEach((category) => {
    const { _id, categoryName } = category;
    const element = `<option value="${categoryName}">${categoryName}</option>`;

    select.insertAdjacentHTML('beforeend', element);
  });
}

getAllCategories();
