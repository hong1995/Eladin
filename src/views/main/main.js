import * as Api from '../api.js';

const newBooksContainer = document.querySelector('.new-books-container');

const datas = await Api.get(`/product/latestlist?pageno=1`);

datas.productsList.productList.forEach((book) => {
  const { _id, imageUrl, bookName, author } = book;

  const element = `
      <div class="book-container" onclick="location.href='/detail?${_id}'">
          <div class="book-info">
              <img src=${imageUrl} class="book-img" alt=${bookName}>
              <p class="name">${bookName}</p>
              <p class="author">${author}</p>
          </div>
      </div>
    `;

  newBooksContainer.insertAdjacentHTML('beforeend', element);
});
