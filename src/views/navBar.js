
const loginNavBar = `<nav class="navbar">
  <a class="navbar-logo" href="/">BOOKSTORE</a>
  <ul class="navbar-menu">
    <li><a href="/list">도서목록</a></li>
  </ul>
  <ul class="navbar-user">
    <li><a href="/register">회원가입</a></li>
    <li><a href="/login">로그인</a></li>
    <li><a href="/accountManagement">계정관리</a></li>
    <li><a href="/cart">장바구니</a></li>
  </ul>
  </nav>`

const logoutNavBar = `<nav class="navbar">
<a class="navbar-logo" href="/">BOOKSTORE</a>
<ul class="navbar-menu">
  <li><a href="/list">도서목록</a></li>
</ul>
<ul class="navbar-user">
  <li><a href="/register">회원가입</a></li>
  <li><a href = "/" id = 'logout'>로그아웃</a></li>
  <li><a href="/accountManagement">계정관리</a></li>
  <li><a href="/cart">장바구니</a></li>
</ul>
</nav>`;

const e = document.createElement('div')
if (localStorage.getItem("token")){
  e.innerHTML = logoutNavBar;
} else { 
  e.innerHTML = loginNavBar;
}

document.body.insertBefore(e, document.body.firstChild);


const out = document.querySelector('#logout')
out.addEventListener('click', logout);

function logout () {
  localStorage.removeItem('token');
}
