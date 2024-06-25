// 상품 수정, 삭제 시 비밀번호가 없는 경우, “비밀번호를 입력해 주세요.” 메세지를 반환합니다.
// 상품 수정 시 상품 상태에 **FOR_SALE**, **SOLD_OUT** 이 외의 다른 값이 입력된 경우, 
// “상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.” 메세지를 반환합니다.
import Joi from 'joi';
import { PRODUCT_STATUS } from '../../constants/product.constant.js';

export const updateProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().messages({
        'string.base': '상품명은 문자열이어야 합니다.', 
      }),
      description: Joi.string().messages({
        'string.base': '상품설명은 문자열이어야 합니다.', 
      }),
      status: Joi.string()
        // 상품 상태가 PRODUCT_STATUS 객체에 정의된 값들 중 하나인지 확인합니다.
        // PRODUCT_STATUS 객체의 값들을 배열로 변환하여 .valid() 메서드에 전달합니다.
        .valid(...Object.values(PRODUCT_STATUS)) 
        .messages({
          'string.base': '상품 상태는 문자열이어야 합니다.',
          'any.only': '상품 상태는 [FOR_SALE, SOLD_OUT] 중 하나여야 합니다.',
      }),
      password: Joi.string().required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.required': '비밀번호를 입력해 주세요.'
      }),
    });
    await joiSchema.validateAsync(req.body); 
    next();
  }catch(error){
    next(error);
  }
};