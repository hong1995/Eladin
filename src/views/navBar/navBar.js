const loginNavBar = `
<nav class="navbar">
  <div class="logo-container" onclick="location.href='/'">
    <img src="/logo.png" class="logo-img">
    <p class="navbar-logo">엘라딘</p>
  </div>  
  <ul class="navbar-menu">
    <li><a href="/list">도서목록</a></li>
  </ul>
  <ul class="navbar-user">
    <li><a href="/register">회원가입</a></li>
    <li><a href="/login">로그인</a></li>
  </ul>
  </nav>`;

const logoutNavBar = `
<nav class="navbar">
<div class="logo-container" onclick="location.href='/'">
    <img src="/logo.png" class="logo-img">
    <a class="navbar-logo" href="/">엘라딘</a>
  </div>
<ul class="navbar-menu">
  <li><a href="/list">도서목록</a></li>
</ul>
<ul class="navbar-user">
  <li><a href = "/" id = 'logout'>로그아웃</a></li>
  <li><a href="/accountManagement">계정관리</a></li>
  <li><a href="/cart">장바구니</a></li>
</ul>
</nav>`;

// 화면에 부착
const e = document.createElement('div');

if (localStorage.getItem('token')) {
  e.innerHTML = logoutNavBar;
} else {
  e.innerHTML = loginNavBar;
}

document.body.insertBefore(e, document.body.firstChild);

// 로그아웃

const out = document.querySelector('#logout');
if (out) {
  out.addEventListener('click', logout);
}

function logout() {
  localStorage.removeItem('token');
}
