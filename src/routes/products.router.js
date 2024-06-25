// routes/products.router.js
import express from 'express';
import products from '../schemas/product.schema.js'; // 상품 관리하는 스키마
import { createProductValidator } from '../middlewares/validators/create-products.validator.middleware.js';
import { updateProductValidator } from '../middlewares/validators/update-products.validator.middleware.js';
import { deleteProductValidator } from '../middlewares/validators/delete-products.validator.middleware.js';

// express.js의 라우터를 생성합니다.
const productsRouter = express.Router();

// 상품 목록 조회 시 상품이 없는 경우에는 빈 배열([])을 반환합니다.

// 1. 상품 등록 API구현
productsRouter.post('/products', createProductValidator, async (req, res, next) => {
  try {
    // 1-1. 클라이언트로 부터 전달받은 데이터를 가져온다
    // 1-1. name, description, manager, password를 body로 가져온다.
    const { name, description, manager, password } = req.body;

    // 1-4. DB 조회하기
    const existedProduct = await products.findOne({ name }).exec();
    // 1-5. 에러처리
    // 1-5. 상품 생성 시 입력 받은 상품명이 기존에 등록 된 상품명과 동일한 경우에는 “이미 등록 된 상품입니다.” 메세지를 반환합니다.
    if(existedProduct) {
      return res
      .status(400)
      .json({ status: 400, message: '이미 등록된 상품입니다.' });
    }

    // 1-2. DB에 저장하기
    const product = new products({ name, description, manager, password });
    let createdProduct = await product.save();
    
    // 1-6. 필요한 데이터만 가져오기
    createdProduct = {...createdProduct._doc, password: undefined };
    // 1-3. 생성된 상품 정보를 클라이언트에게 응답(Response) 반환한다.
    // 201: 상품 생성에 성공했습니다.
    return res
      .status(201)
      .json({status:201, message: '상품 생성에 성공했습니다.', createdProduct});
  } catch (error) {
    next(error);
  }
});

// 2. 상품 목록 조회
productsRouter.get('/products', async (req, res) => {
  try {
    // 2-1. 상품 목록 데이터 가져오기
    const productList = await products.find().sort('-createdAt').exec();
    // 2-2. 200 : 상품 목록 조회에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 목록 조회에 성공했습니다.', productList });
  } catch (error) {
    next(error);
  }
});

// 3. 상품 상세 조회
productsRouter.get('/products/:id', async (req, res) => {
  try {
    // 3-1. 상품 ID를 path parameter로 전달받는다.
    const { id } = req.params;
    // 3-2. DB에서 조회하기
    const productDetail = await products.findById(id).exec();
    // 3-4. 상품이 없는 경우에는 “상품이 존재하지 않습니다.” 메세지를 반환합니다. 
    if(!productDetail) {
      return res
      .status(404)
      .json({status: 404, message: '상품이 존재하지 않습니다.'});
    }
    // 3-3. 200 : 상품 상세 조회에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 상세 조회에 성공했습니다.', productDetail });
  } catch (error) {
    next(error);
  }
});

// 4. 상품 수정
productsRouter.put('/products/:id', updateProductValidator, async (req, res) => {
  try {
    // 4-1. 상품 ID를 path parameter로 전달받는다.
    const { id } = req.params;
    // 4-2 상품명, 상품 설명, 담당자, 상품 상태, 비밀번호 Request body로 전달 받기
    const {name, description, status, manager, password} = req.body;
    // 4-3. DB에서 조회하기 (패스워드포함)
    const productInfo = await products.findById(id, {password: true}).exec();
    
    // 4-7. 상품이 없는 경우에는 “상품이 존재하지 않습니다.” 메세지를 반환합니다. 
    if(!productInfo) {
      return res
      .status(404)
      .json({status: 404, message: '상품이 존재하지 않습니다.'});
    }
    
    // 4-3. 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 상품이 수정되어야 합니다.
    const isPasswordMatched = password === productInfo.password;
    // 4-4. 일치하지 않을 경우, “비밀번호가 일치하지 않습니다.” 메세지를 반환합니다.
    if (!isPasswordMatched) {
      return res.status(401).json({status: 401, message: '비밀번호가 일치하지 않습니다.' });
    }
    // 4-5. DB에서 갱신하기
    const updatedProduct = await products.findByIdAndUpdate(id, { name, description, status, manager }, { new: true }).exec();
    
    // 4-6. 200 : 상품 수정에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 수정에 성공했습니다.',  updatedProduct});
  } catch (error) {
    next(error);
  }
});

// 5. 상품 삭제
productsRouter.delete('/products/:id', deleteProductValidator, async (req, res) => {
  try {
    // 5-1. 상품 ID를 path parameter로 전달받는다.
    const { id } = req.params;
    // 5-2. 비밀번호 Request body로 전달 받기
    const {password} = req.body;
    // 5-3. DB에서 조회하기 (패스워드포함)
    const productInfo = await products.findById(id, {password: true}).exec();
    
    // 5-7. 상품이 없는 경우에는 “상품이 존재하지 않습니다.” 메세지를 반환합니다. 
    if(!productInfo) {
      return res
      .status(404)
      .json({status: 404, message: '상품이 존재하지 않습니다.'});
    }

    // 5-4. 삭제할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 상품이 삭제되어야 합니다. 
    const isPasswordMatched = password === productInfo.password;
    // 5-4. 일치하지 않을 경우, “비밀번호가 일치하지 않습니다.” 메세지를 반환합니다.
    if (!isPasswordMatched) {
      return res.status(401).json({status: 401, message: '비밀번호가 일치하지 않습니다.' });
    }
    // 5-5. DB에서 삭제하기
    const deletedProduct = await products.findByIdAndDelete(id);
    
    // 5-6. 200 : 상품 수정에 성공했습니다.
    return res.status(200).json({status: 200, message: '상품 삭제에 성공했습니다.',  deletedProduct});
  } catch (error) {
    next(error);
  }
});

export default productsRouter;