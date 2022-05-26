const receivedId = Number(location.href.split('?')[1]);
const bookContainer = document.querySelector('.book-container');

async function fetchData() {
  const res = await fetch('../list/data.json');
  const datas = await res.json();

  const book = datas.data.filter((book) => book.id === receivedId);
  const { bookName, author, publisher, price, info, imageUrl } = book[0];

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
}

const addCartBtn = document.querySelector('.add-cart');
addCartBtn.addEventListener('click', addCart);

function addCart() {
  // 1. indexedDB 객체 가져오기
  const indexedDB = window.indexedDB;

  // 2. 브라우저에서 지원하는지 체크하기
  if (!indexedDB)
    window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  else {
    let db;
    let objectStore;
    const request = indexedDB.open('cartDB');

    request.onupgradeneeded = (e) => {
      console.log('indexedDB.onupgradeneeded');
      db = e.target.result;

      // IDBObjectStore
      var store = db.createObjectStore('product', { keyPath: 'id' });
      var indexName = 'by_name';
      var keyPath = 'name';
      // IDBIndex
      var index = store.createIndex(indexName, keyPath);
      var obj = {
        [key]: 1,
        [keyPath]: 'name',
      };
      store.put(obj);
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      console.log('success is called', db);
    };

    request.error = (e) => {
      console.error('indexedDB : ', e.target.errorCode);
    };
  }
}

fetchData();
