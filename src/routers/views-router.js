import express from 'express';
import path from 'path';
import { loginRequired, errorHandler } from '../middlewares';

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use('/', serveStatic('main'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/category', serveStatic('category'));
viewsRouter.use('/list', serveStatic('list'));

viewsRouter.use('/detail', serveStatic('detail'));
viewsRouter.use('/', serveStatic('main'));

//로그인 한 경우만 필요한 페이지
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/orderHistory', serveStatic('orderHistory'));
viewsRouter.use('/deleteAccount', serveStatic('deleteAccount'));

viewsRouter.use('/userInfo', serveStatic('userInfo'));
viewsRouter.use('/deleteAccount', serveStatic('deleteAccount'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/orderComplete', serveStatic('orderComplete'));
viewsRouter.use('/orderHistory', serveStatic('orderHistory'));
viewsRouter.use('/sellProduct', serveStatic('sellProduct'));
//
//로그아웃 한 경우만 필요한 페이지
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/register', serveStatic('register'));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
