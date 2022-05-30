const logoutNavBar = `<nav class="navbar">
<a class="navbar-logo" href="/">BOOKSTORE - Admin</a>
<ul class="navbar-menu">
  <li><a href="/adminBookList">도서목록</a></li>
</ul>
<ul class="navbar-user">
  <li><a href = "/adminMain" id = 'logout'>로그아웃</a></li>
  <li><a href="/adminPageManage">웹서비스 관리</a></li>
</ul>
</nav>`;

const e = document.createElement('div')
e.innerHTML = logoutNavBar;
document.body.insertBefore(e, document.body.firstChild);


const out = document.querySelector('#logout')
out.addEventListener('click', logout);

function logout () {
  localStorage.removeItem('token');
}
