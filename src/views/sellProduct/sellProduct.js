import * as Api from '/api.js';

const bookNameInput = document.querySelector('#bookName');
const authorInput = document.querySelector('#author');
const categoryInput = document.querySelector('#category');
const publisherInput = document.querySelector('#publisher');
const infoInput = document.querySelector('#info');
const photo = document.querySelector('#photo');
const priceInput = document.querySelector('#price');
const purchaseButton = document.querySelector('#purchaseButton');


purchaseButton.addEventListener('click', sell);


async function sell(e) {
    e.preventDefault();

    const bookName = bookNameInput.value;
    const author = authorInput.value;
    const category = categoryInput.value;
    const publisher = publisherInput.value;
    const info = infoInput.value;
    const price = priceInput.value;

    try {
        console.log(price)
        const data = {bookName, author, category, publisher, price, info }
        const result = await Api.post('/product/register',data);
        console.log(result);
    } catch (e) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}