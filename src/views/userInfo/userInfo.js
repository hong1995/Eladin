import * as Api from '/api.js';

const fullNameInput = document.querySelector('#fullName');
const currentPasswordInput = document.querySelector('#currentPassword');
const newPasswordInput = document.querySelector('#newPassword');
const phoneNumberInput = document.querySelector('#phoneNumber');
const receiverAddressInput = document.querySelector('#receiverAddress');
const detailAddressInput = document.querySelector('#detailAddress');
const restAddress = document.querySelector('#restAddress');
const editButton = document.querySelector('#editButton')

editButton.addEventListener('click', submitUserInfo);

async function submitUserInfo(e) {
    e.preventDefault();

    const fullName = fullNameInput.value;
    const currentPassword = currentPasswordInput.value;
    const password = newPasswordInput.value;
    const phoneNumber = phoneNumberInput.value;
    const address = `receiverAddressInput.value detailAddressInput.value restAddress.value`;
    

    try {
        console.log(fullName);
        const data = {fullName, password, phoneNumber, address, currentPassword }
        const result = await Api.patch('/api/update','',data);
        console.log(result);
    } catch (e) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}