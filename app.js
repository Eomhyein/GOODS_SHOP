// app.js : 서브의 설정과 기본적인 동작을 정의하는 곳
import express from 'express';
import productsRouter from './routes/products.js';
import connect from './schemas/mongodb.js'; // 몽고디비연결

const app = express();
const PORT = 3000; // 서버 열 때 사용할 포트번호

const router = express.Router(); // 라우터 생성

connect(); // 몽고디비 연결하기 위한 connect 함수를 실행한다.
// Express에서 req.body에 접근하여, body 데이터를 사용할 수 있도록 설정하는 미들웨어
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// localhost:3000/ -> productsRouter 라우터를 등록 합니다.
app.use('/products', productsRouter);
app.use(router);


// 서버시작 : Express.js는 지정된 포트 번호를 사용하여 서버를 시작합니다. 
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});