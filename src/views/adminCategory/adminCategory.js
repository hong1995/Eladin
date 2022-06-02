import * as Api from '/api.js';

const rename = document.querySelector('#rename');
const continueButton = document.querySelector('#continueButton');
const select = document.querySelector('.selectCategory');
const selectWork = document.querySelector('.selectWork');

async function categoryWork(e) {
  e.preventDefault();

  try {
    if (selectWork.value === 'addCategory') {
      addCategory();
      alert('추가됐습니다.');
      location.href = '/adminCategory';
    } else if (selectWork.value === 'updateCategory') {
      updateCategory();
      alert('수정됐습니다.');
      location.href = '/adminCategory';
    } else {
      deleteCategory();
      alert('삭제됐습니다.');
      location.href = '/adminCategory';
    }
  } catch (err) {
    console.log(err);
  }
}

async function addCategory() {
  const categoryName = rename.value;
  console.log(categoryName);
  const result = await Api.post('/category/register', { categoryName });
}

async function updateCategory() {
  const categoryId = select.value;
  const categoryName = rename.value;
  const result = await Api.postparam('/category/setcategory', categoryId, {
    categoryName,
  });
}

async function deleteCategory() {
  const categoryId = select.value;
  const categoryName = rename.value;
  const apiUrl = `/category/deletecategory/${categoryId}`;
  const bodyData = JSON.stringify({ categoryName });

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: bodyData,
  });
  console.log(res);

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
}

async function getAllCategories() {
  const dropDownCategories = await Api.get('/category/list');
  dropDownCategories.forEach((category) => {
    const { _id, categoryName } = category;
    const element = `<option value="${_id}">${categoryName}</option>`;

    select.insertAdjacentHTML('beforeend', element);
  });
}

function onChnage(e) {
  const selected = e.target.value;
  if (selected === 'addCategory') {
    select.disabled = true;
    rename.disabled = false;
  } else if (selected === 'updateCategory') {
    select.disabled = false;
    rename.disabled = false;
  } else {
    select.disabled = false;
    rename.disabled = true;
  }
}

getAllCategories();
selectWork.addEventListener('change', onChnage);
continueButton.addEventListener('click', categoryWork);
