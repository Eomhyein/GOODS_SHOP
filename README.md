# 🛒내배캠 장터 백엔드 서버 만들기
## [목표]
**: "Node.js와 Express.js를 활용한 나만의 내배캠 장터 백엔드 서버 만들기"**
1) Node.js를 이용해서 Javascript 코드를 실행할 수 있습니다.
2) Express.js를 기반으로 웹 서버를 만들고, **CRUD(Create, Read, Update, Delete)** 기능이 포함된 REST API를 만들 수 있습니다.
3) MongoDB와 mongoose를 이용하여 원하는 데이터베이스를 설계하고 활용할 수 있습니다.
4) AWS EC2에 Express.js를 이용한 웹 서비스를 배포할 수 있습니다.
5) 프로젝트에 요구 사항을 토대로 API 리스트를 작성하고, 백엔드 서버를 설계할 수 있습니다.

## [기술 스택]
1) **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2) **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다. **(npm을 사용해도 되지만, 두 가지를 혼용하지는 마세요)**
3) **모듈 시스템**: 최신 JS 문법을 지원하는 **ESM(ES6 모듈 시스템)**을 사용합니다.
4) **데이터베이스**: 대표적인 **NoSQL** 중 하나인 **MongoDB**를 직접 설치하지 않고, Cloud 서비스 **[MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)**에서 대여해 사용합니다.
5) **ODM**: **MongoDB**의 데이터를 쉽게 읽고 쓰게 해주는 [**mongoose](https://mongoosejs.com/docs/guide.html) ODM**을 사용합니다.

## [API 명세서]
**[예시]**
|분류|설명|Method|URL|
|------|---|---|---|
|  |공통 명세 사항|  |   |
|상품|상품 생성(C)|POST|/products|
|상품|상품 목록 조회 (R)|GET|/products|
|상품|상품 상세 조회 (R)|GET|/products/:id|
|상품|상품 수정 (U)|PUT|/products/:id|
|상품|상품 삭제 (D)|DELETE|/products/:id|

### [공통 명세 사항]
## **👉 Request**</br>
## **👈 Response**</br>

**[Success]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|status|number|HTTP Status Code|
|message|string|API 호출 성공 메세지|
|data|Object|API 호출 결과 데이터|

**[예시]**
<pre><code>{
  "status": 201,
  "message": "상품 생성에 성공했습니다.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "페레로로쉐",
    "description": "맛있는 초콜렛",
    "manager": "스파르탄",
    "status": "FOR_SALE",
    "createdAt": "2024-05-01T05:11:06.285Z",
    "updatedAt": "2024-05-01T05:11:06.285Z", 
  }
}</code></pre>

**[Failure]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|status|number|HTTP Status Code|
|message|string|API 호출 성공 메세지|

|status|message|
|------|---|
|400|비밀번호를 입력해 주세요.|
|401|비밀번호가 일치하지 않습니다.|
|404|상품이 존재하지 않습니다.|
|500|예기치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.|

**[예시]**
<pre><code>{
  "status": 404,
  "message": "상품이 존재하지 않습니다.",
}</code></pre>

### [상품 생성 (C)]
**POST
/products**

## **👉 Request**</br>
**[Body]**

**[정의]**
|이름|타입|필수 여부|설명|
|------|---|---|------|
|name|string|Y|상품명|
|description|string|Y|상품 설명|
|manager|string|Y|담당자|
|password|string|Y|비밀번호

**[예시]**
<pre><code>{
  "name": "페레로로쉐",
  "description": "맛있는 초콜렛",
  "manager": "스파르탄",
  "password": "spartan!!123"
}</code></pre>

## **👈 Response**</br>

**[Success]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|id|string|상품 ID|
|name|string|상품명|
|description|string|상품 설명|
|manager|string|담당자|
|status|string|상품 상태|
|createdAt|Date|생성 일시|
|updatedAt|Date|수정 일시|

**[예시]**
<pre><code>{
  "status": 201,
  "message": "상품 생성에 성공했습니다.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "페레로로쉐",
    "description": "맛있는 초콜렛",
    "manager": "스파르탄",
    "status": "FOR_SALE",
    "createdAt": "2024-05-01T05:11:06.285Z",
    "updatedAt": "2024-05-01T05:11:06.285Z"
  }
}
</code></pre>


**[Failure]**

**[정의]**

|status|message|
|------|---|
|400|상품 정보를 모두 입력해 주세요.|
|400|이미 등록된 상품입니다.|

**[예시]**
<pre><code>{
  "status": 400,
  "message": "상품 정보를 모두 입력해 주세요."
}</code></pre>


## [어려운점]
- CRUD 중 C만 구현함, 나머지는 못함, ing 구현중이라고 말할 수 있음
- MongoDB와 mongoose 이용 데이터베이 설계, 활용은 해보았지만 완벽하지 못함
- .gitignore와 .env 사용 처음해봄
  - VSCode에 npm i dotenv 명령어을 써서 .env 설치해야되는 것을 알게됨
- 서버연결을 하고 에러가 발생하면 에러잡기에 어려움을 겪음 어디서 잘 못 된지 알 수 없음
