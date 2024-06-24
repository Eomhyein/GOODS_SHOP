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
// 스키마 작성
const productsSchemas = new mongoose.Schema({
  name : {
    type: String,
    required : true,
  },
  description : {
    type: String,
    required : true,
  },
  password : {
    type: String,
    required : true,
  },
  manager : {
    type: String,
    required : true,
  },
  status : {
    type: String,
    required : false,
  },
  createdAt : {
    type: Date,
    required : false,
  },
  updatedAt : {
    type: Date,
    required : false,
  },
})
// 스키마 통해 모델 구현
// 모델 외부로 보내기
export default mongoose.model('Product', productsSchemas);