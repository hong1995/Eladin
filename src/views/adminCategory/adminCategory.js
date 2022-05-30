import * as Api from '/api.js';

const passwordInput = document.querySelector('#password');
const continueButton = document.querySelector('#continueButton');

continueButton.addEventListener('click', deleteUser);

async function deleteUser(e)  {
    e.preventDefault();

    try {
        console.log(passwordInput.value);
        const data = passwordInput.value;
        const result = await Api.delete('/api/del','',{data});
        alert(result);
        

    } catch (err) {
        console.log(err);
    }
}