const tokenUrl = new URL(location.href);

const token = tokenUrl.searchParams.get('token');
localStorage.setItem('token', token);
console.log('kakao login success')
window.location.href = '/';