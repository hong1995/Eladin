const fullNameInput = document.querySelector('#fullNameInput');
const currentPasswordInput = document.querySelector('#currentPasswordInput');
const newPasswordInput = document.querySelector('#newPasswordInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const receiverAddressInput = document.querySelector('#receiverAddressInput');
const detailAddressInput = document.querySelector('#detailAddressInput');
const restAddress = document.querySelector('#restAddress');
const editButton = document.querySelector('#editButton')

purchaseButton.addEventListener('click', submituserInfo);

async function submituserInfo(e) {
    e.preventDefault();

    const fullNameInput = fullNameInput.value;
    const currentPasswordInput = currentPasswordInput.value;
    const newPasswordInput = newPasswordInput.value;
    const phoneNumberInput = phoneNumberInput.value;
    const receiverAddressInput = `receiverAddressInput.value detailAddressInput.value restAddress.value;`;
    

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