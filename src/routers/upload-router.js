import express from 'express';
import path from 'path';
import multer from 'multer';

const uploadRouter = express.Router();

const upload = multer({
  // 서버 디스크에 저장
  storage: multer.diskStorage({
    //destination은 저장할 경로. 동일 경로 내 uploads에 저장할 것임.
    // uploads 폴더를 생성해 둘 것.
    destination(req, file, cb) {
      cb(null, 'src/public/uploads/');
    },
    // filename은 저장할 파일의 이름
    filename(req, file, cb) {
      // ext는 확장자 명을 말합니다.
      const ext = path.extname(file.originalname);
      // basename은 파일 이름입니다. 파일 이름 + 현재 시간 + 확장자로 정하겠습니다.
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext,
      );
    },
  }),
});
// 사진 업로드
uploadRouter.post('/register', upload.single('img'), (req, res) => {
  res.json({ url: `/static/uploads/${req.file.filename}` });
});

export { uploadRouter };
