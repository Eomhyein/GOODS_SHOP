// routes/products.router.js
import express from 'express';
// mongoose
import mongoose from 'mongoose';
import products from '../schemas/product.schema.js'; // 상품 관리하는 스키마

// express.js의 라우터를 생성합니다.
const router = express.Router();

// 상품 등록 API구현
router.post('/', async (req, res, next) => {
  try {
    // 클라이언트로 부터 전달받은 데이터를 가져온다
    // id, name, description, manager, status, createdAt, updateAt
    const { name, description, password, manager, status } = req.body;
    // name값이 중복되지 않는지 검사 => 실제로 몽고디비에 데이터를 조회해서, 해당하는 데이터가 몽고디비에 존재하는지 확인한다.
    const existingProducts = await products.find({name}).exec(); 
      
    // 만약 중복되면 에러메시지 전달
    // status 400: message 상품 정보를 모두 입력해 주세요.
    // 400: 이미 등록 된 상품입니다.
    if(existingProducts.length) {
      return res.status(400).json({status:400, message: '이미 등록된 상품입니다.'});
    }
  
// products 상품 생성
// const createdProducts = await products.create ({
//   name, 
//   description, 
//   password,
//   manager, 
//   status, 
//   createdAt, 
//   updateAt,
// });
  
// // 생성된 상품 정보를 클라이언트에게 응답(Response) 반환한다.
// // 201: 상품 생성에 성공했습니다.
// return res.status(201).json({status:201, message: '상품 생성에 성공했습니다.', createdProduct});
  } catch (error) {
    next(error);
  }


// 상품 목록 조회
router.get('/', async (req, res) => {
  // 상품 목록 데이터 가져오기
  // const createdProducts = await products.find().sort('-order').exec();
  // // 200 : 상품 목록 조회에 성공했습니다.
  // return res.status(200).json({status: 200, message: '상품 상세 조회에 성공했습니다.', createdProduct  });
});



// 상품 상세 조회
// 200 : 상품 상세 조회에 성공했습니다.

// 상품 수정
// 200: 상품 수정에 성공했습니다.

// 상품 삭제
// 200: 상품 삭제에 성공했습니다.
});
export default router;