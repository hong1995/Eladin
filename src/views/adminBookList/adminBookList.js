import * as Api from '../api.js';

const listContainer = document.querySelector('.list-container');
const select = document.querySelector('.select');

async function getAllCategories () {
  const dropDownCategories = await Api.get('/category/list');
  dropDownCategories.forEach(( category ) => {
    console.log(category);
    const {categoryName} = category;
    const element = `<option value="${categoryName}">${categoryName}</option>`;

    select.insertAdjacentHTML('beforeend', element);
  })
}

function onChnage(e) {
  const selected = e.target.value;
  console.log(selected);
  if (selected === 'all') {
    getAllBooks();
  } else {
    getCategoryBooks(selected);
  }
}

// 전체 도서 목록 가져오기
async function getAllBooks() {
  removeAllchild();

  const datas = await Api.get('/product/list');
  console.log(datas);

  datas.forEach((book) => {
    const { _id, bookName, author, publisher, price } = book;

    const element = `
      <div class="book-container" onclick="location.href='/adminBookDetail?${_id}'">
          <div class="book-info">
              <img src="" class="book-img" alt=${bookName}>
              <p class="name">${bookName}</p>
              <p class="author">저자: ${author}</p>
              <p class="publisher">출판사: ${publisher}</p>
              <p class="price">판매가: ${price}</p>
          </div>
      </div>
    `;

    listContainer.insertAdjacentHTML('beforeend', element);
  });
}

// 카테고리별 목록 가져오기
async function getCategoryBooks(selectCategory) {
  removeAllchild();

  const books = await Api.get(`/product/category/${selectCategory}`);
  console.log(books);

  books.forEach((book) => {
    const { _id, bookName, author, publisher, price } = book;

    const element = `
      <div class="book-container" onclick="location.href='/adminBookDetail?${_id}'">
          <div class="book-info">
              <img src="" class="book-img" alt=${bookName}>
              <p class="name">${bookName}</p>
              <p class="author">저자: ${author}</p>
              <p class="publisher">출판사: ${publisher}</p>
              <p class="price">판매가: ${price}</p>
          </div>
      </div>
    `;

    listContainer.insertAdjacentHTML('beforeend', element);
  });
}

// listContainer 초기화
function removeAllchild() {
  while (listContainer.hasChildNodes()) {
    listContainer.removeChild(listContainer.firstChild);
  }
}

getAllCategories();

getAllBooks();

select.addEventListener('change', onChnage);
