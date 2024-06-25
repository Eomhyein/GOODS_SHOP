// routes/products.router.js
import express from 'express';
import products from '../schemas/product.schema.js'; // 상품 관리하는 스키마

// express.js의 라우터를 생성합니다.
const productsRouter = express.Router();

// 상품 등록 API구현
productsRouter.post('/products', async (req, res, next) => {
  try {
    // 클라이언트로 부터 전달받은 데이터를 가져온다
    // name, description, manager, password를 body로 가져온다.
    const { name, description, manager, password } = req.body;

    // DB에 저장하기
    const product = new products({ name, description, manager, password });
    const createdProduct = await product.save();
    
    // 생성된 상품 정보를 클라이언트에게 응답(Response) 반환한다.
    // 201: 상품 생성에 성공했습니다.
    return res
      .status(201)
      .json({status:201, message: '상품 생성에 성공했습니다.', createdProduct});
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회
productsRouter.get('/products', async (req, res) => {
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

export default productsRouter;