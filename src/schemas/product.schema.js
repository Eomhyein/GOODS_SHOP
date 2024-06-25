// schemas/products.schema.js
// 상품 관리하는 스키마 구현

// 요구사항
// -id:string:상품 ID
// -name:string:상품명
// -description:string:상품 설명
// -password:string:Y:비밀번호
// -manager:string:담당자
// -status:string:상품 상태
// -createdAt:Date:생성 일시
// -updatedAt:Date:수정 일시

// mongoose 가져오기
import mongoose from "mongoose";

// PRODUCT_STATUS 상수 정의
const PRODUCT_STATUS = {
  FOR_SALE: "FOR_SALE",
  SOLD_OUT: "SOLD_OUT",
};

// 스키마 작성
const productsSchemas = new mongoose.Schema({
  name : {
    type: String,
    required : true,
    unique: true,
  },
  description : {
    type: String,
    required : true,
  },
  manager : {
    type: String,
    required : true,
  },
  password : {
    type: String,
    required : true,
    select: false,
  },
  status : {
    type: String,
    required : true,
    enum: Object.values(PRODUCT_STATUS),
    default: PRODUCT_STATUS.FOR_SALE, // 기본값은 FOR_SALE
  },},
  { timestamps: true, toJSON: { virtuals : true }},
)
// 스키마 통해 모델 구현
// 모델 외부로 보내기
export default mongoose.model('Product', productsSchemas);