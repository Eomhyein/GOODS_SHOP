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
  try {
    // 상품 목록 데이터 가져오기
    const productList = await products.find().sort('-createdAt').exec();
    // 200 : 상품 목록 조회에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 목록 조회에 성공했습니다.', productList });
  } catch (error) {
    next(error);
  }
});







// 상품 상세 조회
productsRouter.get('/products/:id', async (req, res) => {
  try {
    // 상품 ID를 path parameter로 전달받는다.
    const { id } = req.params;
    // DB에서 조회하기
    const productDetail = await products.findById(id).exec();
    // 200 : 상품 상세 조회에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 상세 조회에 성공했습니다.', productDetail });
  } catch (error) {
    next(error);
  }
});





// 상품 수정
// 200: 상품 수정에 성공했습니다.
productsRouter.put('/products/:id', async (req, res) => {
  try {
    // 상품 ID를 path parameter로 전달받는다.
    const { id } = req.params;
    // 상품명, 상품 설명, 담당자, 상품 상태, 비밀번호 Request body로 전달 받기
    const {name, description, status, manager, password} = req.body;
    // DB에서 조회하기 (패스워드포함)
    // 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 상품이 수정되어야 합니다. 
    const productInfo = await products.findById(id, {password: true}).exec();
    const isPasswordMatched = password === productInfo.password;
    // 일치하지 않을 경우, “비밀번호가 일치하지 않습니다.” 메세지를 반환합니다.
    if (!isPasswordMatched) {
      return res.status(401).json({status: 401, message: '비밀번호가 일치하지 않습니다.' });
    }
    // DB에서 수정하기
    const updatedProduct = await products.findByIdAndUpdate(id, { name, description, status, manager }, { new: true }).exec();
    
    // 200 : 상품 수정에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 수정에 성공했습니다.',  updatedProduct});
  } catch (error) {
    next(error);
  }
});


// 상품 삭제
// 200: 상품 삭제에 성공했습니다.




export default productsRouter;