import * as Api from '../api.js';

const newBooksContainer1 = document.querySelector('.new-books-container1');
const newBooksContainer2 = document.querySelector('.new-books-container2');
const newBooksContainer3 = document.querySelector('.new-books-container3');
const newBooksContainer4 = document.querySelector('.new-books-container4');

const datas = await Api.get(`/product/latestlist?pageno=1`);

datas.productsList.productList.forEach((data, i) => {
  const { _id, imageUrl, bookName, author } = data;

  const element = `
      <div class="book-container" onclick="location.href='/adminBookDetail?${_id}'">
          <div class="book-info">
            <div class = "imgGallery">          
            <img src=${imageUrl} class="book-img" alt=${bookName}>
            </div>
              <p class="name">${bookName}</p>
              <p class="author">${author}</p>
          </div>
      </div>
    `;

  if (i < 3) {
    newBooksContainer1.insertAdjacentHTML('beforeend', element);
    newBooksContainer4.insertAdjacentHTML('beforeend', element);
  } else if (i < 6) {
    newBooksContainer2.insertAdjacentHTML('beforeend', element);
  } else {
    newBooksContainer3.insertAdjacentHTML('beforeend', element);
  }
});

// slide
let slider = document.querySelector('.slider');
let slides = slider.querySelector('.slides');
let slide = slides.querySelectorAll('.slide');

let currentSlide = 0;

setInterval(function () {
  let from = -(1024 * currentSlide);
  let to = from - 1024;
  slides.animate(
    {
      marginLeft: [from + 'px', to + 'px'],
    },
    {
      duration: 1200,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );
  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 3500);
