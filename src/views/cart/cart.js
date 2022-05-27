let cartProductsItem = `<div class="cartProductsItem">
<div class="leftSpacer">
  <label class="checkbox">
      <input type="checkbox">
  </label>
</div>
  <figure class="image is-96x96">
      <img src="https://bulma.io/images/placeholders/96x96.png">
  </figure>
  <div class="content">
    <!-- 책 제목 12글자 넘어가면 ... 처리 -->
      <p>코어 자바스크립트</p>
      <p>정재남</p>
      <div class = "quantity">
          <button class = "button">-</button>
          <input class = "quantityInput" type="text">
          <button class = "button">+</button>
      </div>
  </div>
  <div class = "calculation">
      <p>19000원</p>
      <p>X</p>
      <p>1</p>
      <p>=</p>
      <p>19000원</p>
  </div>
  <div class="rightSpacer">
    <button class="delete deleteButton"></button>
  </div>
</div>`

const cartProductContainer = document.querySelector('.cartProductContainer');
const inner_box= document.createElement('div');
for(let i = 0; i<10; i++) {
    inner_box.innerHTML+=cartProductsItem;
}

cartProductContainer.appendChild(inner_box);

const bookCount = document.querySelector('#bookCount');
bookCount.innerHTML = '10개';

const bookPrice = document.querySelector('#bookPrice');
bookPrice.innerHTML = '10000원';

const bookTotalPrice = document.querySelector('#bookTotalPrice');
bookTotalPrice.innerHTML = '100000원';