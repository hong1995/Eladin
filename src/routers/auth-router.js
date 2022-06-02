import { Router } from 'express';
import { authService } from '../services/index'
import { userService } from '../services/index';
const authRouter = Router();

// url 을 생성하고 카카오에 토큰요청
authRouter.get('/kakao/start',(req, res, next) =>{
  const url = authService.makeUrlKakaoToken()
  //카카오에 등록된 redirect 로 이동
  res.redirect(url);
})

// 토큰인증을 받기 + 유저정보 요청/받기 + jwt 토큰 res 에 생성
authRouter.get('/kakao/callback', async(req, res, next) => {
  try{
    const REST_API_KEY = process.env.KAKAO_ID;
    const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
    const KAKAO_REDIRECTURL = process.env.KAKAO_REDIRECTURL;
    const config = {
      client_id: REST_API_KEY,
      client_secret: KAKAO_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: KAKAO_REDIRECTURL,
      code: req.query.code
    };

    // 유저 정보 요청
    const userInfo = await authService.requestUser(config);

    // 우리 db에 있는지 확인
    const isthereDB = await authService.checkMember(userInfo);
    
    let user = null;

    //회원정보가 db에 없으면
    if(!isthereDB){
      //회원정보 등록
      user = await authService.signUp(userInfo);
    }
    //있으면
    else{
      const { email } = userInfo.kakao_account;
      //기존회원이면 회원 정보 찾아옴
      user = await userService.getUserByEmail(email)
    }

    //만약 유저정보가 등록도 안되고 db에서 찾는것도 안되면 다음 오류 발생
    if(!user)
      res.status(401).send("유저 정보가 할당이 안됩니다 이메일 정보 허용을 확인하세요")

    // 토큰 생성
    else{
      const  token = await authService.getToken(user)
      res.status(200).json(token)
    }
    
    }catch(err){
    next(err)
  }
});
export { authRouter };