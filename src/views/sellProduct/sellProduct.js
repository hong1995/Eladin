import * as Api from '/api.js';
import { validateNull, validateNumber } from '../useful-functions.js';

const bookNameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const categoryInput = document.querySelector('#category');
const publisherInput = document.querySelector('#publisher');
const infoInput = document.querySelector('#info');
const priceInput = document.querySelector('#price');
const photo = document.querySelector('#photo');
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
  const price = priceInput.value;
  const img = new FormData();
  img.append('img', photo.files[0]);

  const arr = [bookName, author, publisher, price, info, photo.value];
  console.log(arr);

  function validationCheck(arr) {
    if (!validateNull(arr)) {
      return false;
    }

    if (!validateNumber(price)) {
      alert('가격에 숫자만 입력해주세요.');
      return false;
    }

    return true;
  }

  if (validationCheck(arr)) {
    try {
      const urlResult = await fetch('/upload/register/', {
        method: 'POST',
        body: img,
      });

      const imageJson = await urlResult.json();
      const imageUrl = imageJson.url;

      const data = {
        bookName,
        author,
        category,
        publisher,
        price: Number(price),
        info,
        imageUrl,
      };

      await Api.post('/product/register', data);
      alert(`${bookName} 등록이 완료되었습니다.`);
      location.href = '/sellProduct';
    } catch (err) {
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
