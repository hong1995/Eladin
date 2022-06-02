import * as Api from '/api.js';

const passwordInput = document.querySelector('#password');
const continueButton = document.querySelector('#continueButton');

continueButton.addEventListener('click', deleteUser);

async function deleteUser(e)  {
    e.preventDefault();

    try {
        console.log(passwordInput.value);
        const data = passwordInput.value;
        await Api.delete('/api/del','',{data});
        alert('탈퇴가 완료되었습니다.');
        localStorage.removeItem('token');
        location.href = '/';
    } catch (err) {
        console.log(err);
    }
}