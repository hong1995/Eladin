const listContainer = document.querySelector('.list-container');
const select = document.querySelector('.select');

function onChnage(e) {
  const selected = e.target.value;
  if (selected === 'all') {
    getAllBooks();
  } else if (selected === 'domestic') {
    getCategoryBooks('domestic');
  } else {
    getCategoryBooks('global');
  }
}

// 전체 도서 목록 가져오기
async function getAllBooks() {
  removeAllchild();

  const res = await fetch('./data.json');
  const datas = await res.json();

  datas.data.forEach((book) => {
    const { id, bookName, author, publisher, price, imageUrl } = book;

    // ** onclick 시 쿼리 (id?) 넘겨서 상세페이지로 이동시키기 **
    const element = `
      <div class="book-container" onclick="location.href='/detail?${id}'">
          <div class="book-info">
              <img src=${imageUrl} class="book-img" alt=${bookName}>
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

  const res = await fetch('./data.json');
  const datas = await res.json();

  const books = datas.data.filter((book) => book.category === selectCategory);
  console.log(books);

  books.forEach((book) => {
    const { id, bookName, author, publisher, price, imageUrl } = book;

    const element = `
      <div class="book-container" onclick="location.href='/detail?${id}'">
          <div class="book-info">
              <img src=${imageUrl} class="book-img" alt=${bookName}>
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

getAllBooks();

select.addEventListener('change', onChnage);
