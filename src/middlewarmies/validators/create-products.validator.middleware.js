// joi 이용
// 상품 생성 시 유효성 검사
// 상품 생성 시 정보가 빠진 경우, “OOO을(를) 입력해 주세요.” 메시지를 반환합니다.
// 예) ****“상품명을 입력해 주세요”, “담당자를 입력해 주세요.” 등…
import Joi from 'joi';

export const createdProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': '상품명을 입력해 주세요.',
        'string.base': '상품명은 문자열이어야 합니다.',
      }),
      description: Joi.string().required().messages({
        'any.required': '상품 설명을 입력해 주세요.',
        'string.base': '상품 설명은 문자열이어야 합니다.',
      }),
      manager: Joi.string().required().messages({
        'any.required': '담당자를 입력해 주세요.',
        'number.base': '담당자는 문자열이여야 합니다.',
      }),
      password: Joi.string().required().messages({
        'any.required' : '비밀번호를 입력해 주세요.',
        'string.base': '비밀번호는 문자열이어야 합니다.'
      }),
    });
    await joiSchema.validateAsync(req.body); // joi schema validation
    next();
  }catch(error){
    next(error);
  }
};


