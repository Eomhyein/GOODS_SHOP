[목표]
: "Node.js와 Express.js를 활용한 나만의 내배캠 장터 백엔드 서버 만들기"
1. Node.js를 이용해서 Javascript 코드를 실행할 수 있습니다.
2. Express.js를 기반으로 웹 서버를 만들고, **CRUD(Create, Read, Update, Delete)** 기능이 포함된 REST API를 만들 수 있습니다.
3. MongoDB와 mongoose를 이용하여 원하는 데이터베이스를 설계하고 활용할 수 있습니다.
4. AWS EC2에 Express.js를 이용한 웹 서비스를 배포할 수 있습니다.
5. 프로젝트에 요구 사항을 토대로 API 리스트를 작성하고, 백엔드 서버를 설계할 수 있습니다.

[기술 스택]
1. **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2. **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다. **(npm을 사용해도 되지만, 두 가지를 혼용하지는 마세요)**
3. **모듈 시스템**: 최신 JS 문법을 지원하는 **ESM(ES6 모듈 시스템)**을 사용합니다.
4. **데이터베이스**: 대표적인 **NoSQL** 중 하나인 **MongoDB**를 직접 설치하지 않고, Cloud 서비스 **[MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)**에서 대여해 사용합니다.
5. **ODM**: **MongoDB**의 데이터를 쉽게 읽고 쓰게 해주는 [**mongoose](https://mongoosejs.com/docs/guide.html) ODM**을 사용합니다.

[요구사항]
0. 설계:요구사항 파악 및 스키마 정의
--API 명세서 확인--
1. 공통 명세 사항
1) Request:
2) Response:
  [성공]
  -status:number:HTTP Status Code
  -message:string:API 호출 성공 메세지
  -data Object:API 호출 결과 데이터
  예) {
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
  }
  [실패]
  -status:number:HTTP Status Code
  -message:string:API 호출 실패 메세지
    -400:비밀번호를 입력해 주세요.
    -401:비밀번호가 일치하지 않습니다
    -404:상품이 존재하지 않습니다
    -500:예상치 못한 에러가 발생했습니다. 관리자에게 문의 해주세요.
  예) {
  "status": 404,
  "message": "상품이 존재하지 않습니다.",
  }

2. 상품 생성(C) -POST-URL:/products
1) Request:
  [Body]
  -name:string:Y:상품명
  -description:string:Y:상품 설명
  -manager:string:Y:담당자
  -password:string:Y:비밀번호
  예){
    "name": "페레로로쉐",
    "description": "맛있는 초콜렛",
    "manager": "스파르탄",
    "password": "spartan!!123"
  }

2) Response:
  [성공]
  -id:string:상품 ID
  -name:string:상품명
  -description:string:상품 설명
  -manager:string:담당자
  -status:string:상품 상태
  -createdAt:Date:생성 일시
  -updatedAt:Date:수정 일시
  예) {
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
  [실패]
  -400:상품 정보를 모두 입력해 주세요.
  -400:이미 등록 된 상품입니다.
  예) {
    "status": 400,
    "message": "상품 정보를 모두 입력해 주세요."
  }

3. 상품 목록 조회(R)-GET-URL:/products
1) Request:
2) Response:
  [성공]
  -id:string:상품 ID
  -name:string:상품명
  -description:string:상품 설명
  -manager:string:담당자
  -status:string:상품 상태
  -createdAt:Date:생성 일시
  -updatedAt:Date:수정 일시
  예) {
  "status": 200,
  "message": "상품 목록 조회에 성공했습니다.",
  "data": [
	  {
	    "id": "507f1f77bcf86cd799439011",
	    "name": "페레로로쉐",
	    "description": "맛있는 초콜렛",
	    "manager": "스파르탄",
	    "status": "FOR_SALE",
	    "createdAt": "2024-05-01T05:11:06.285Z",
	    "updatedAt": "2024-05-01T05:11:06.285Z"
	  },
	  {
	    "id": "507f1f77bcf86cd799439011",
	    "name": "킨더조이",
	    "description": "장난감 초콜렛",
	    "manager": "스파르탄",
	    "status": "FOR_SALE",
	    "createdAt": "2024-05-01T05:11:06.285Z",
	    "updatedAt": "2024-05-01T05:11:06.285Z"
      }
    ]
  }

4. 상품 상세 조회(R)-GET-URL:/products/:id
1) Request:
  [Path Parameters]
  -id:string:상품 ID
  예) /products/507f1f77bcf86cd799439011
2) Response:
  [성공]
  -id:string:상품 ID
  -name:string:상품명
  -description:string:상품 설명
  -manager:string:담당자
  -status:string:상품 상태
  -createdAt:Date:생성 일시
  -updatedAt:Date:수정 일시
  예) {
  "status": 200,
  "message": "상품 상세 조회에 성공했습니다.",
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

5. 상품 수정(U)-PUT-URL:/products/:id
1) Request:
  [Path Parameters]
  -id:string:상품 ID
  예) /products/507f1f77bcf86cd799439011
  [Body]
  -name:string:N:상품명
  -description:string:N:상품 설명
  -manager:string:N:담당자
  -status:string:N:상품 상태 (FOR_SALE, SOLD_OUT)
  -password:string:Y:비밀번호
  예) {
  "name": "페레로로쉐",
  "description": "맛있는 초콜렛",
  "manager": "스파르탄",
  "status": "SOLD_OUT",
  "password": "spartan!!123"
  } 
2) Response:
  [성공]
  -id:string:상품 ID
  -name:string:상품명
  -description:string:상품 설명
  -manager:string:담당자
  -status:string:상품 상태
  -createdAt:Date:생성 일시
  -updatedAt:Date:수정 일시
  예){
  "status": 200,
  "message": "상품 수정에 성공했습니다.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "페레로로쉐",
    "description": "맛있는 초콜렛",
    "manager": "스파르탄",
    "status": "SOLD_OUT",
    "createdAt": "2024-05-01T05:11:06.285Z",
    "updatedAt": "2024-05-01T05:11:06.285Z"
    }
  }
6. 상품 삭제(D)-DELETE-URL:/products/:id
1) Request:
  [Path Parameters]
  -id:string:상품 ID
  예) /products/507f1f77bcf86cd799439011
2) Response:
  [성공]
  -id:string:상품 ID
  예) {
  "status": 200,
  "message": "상품 삭제에 성공했습니다.",
  "data": {
    "id": "507f1f77bcf86cd799439011"
    }
  }
--MongoDB 스키마 정의--
1. 개발(준비):프로젝트 기본 세팅
1. `**README.md**` 파일을 생성하여 간략한 프로젝트의 설명 및 실행 방법을 작성합니다.
2. `**.env**` 파일을 이용해서 민감한 정보(DB 계정 정보 등)를 관리합니다.
3. `**.gitignore**` 파일을 생성하여 `**.env**` ,`**node_modules**` 등
불필요하거나 민감한 정보가 Github에 올라가지 않도록 설정합니다.
4. `**.prettierrc**` 파일을 생성하여 일정한 코드 형태를 유지할 수 있도록 설정합니다.
5. `**package.json**` 파일의 `**scripts**` 항목에 `**dev**` 라는 이름을 추가하여 [nodemon](https://myung-ho.tistory.com/95)을 이용해서 서버를 실행할 수 있도록 합니다.

## 2️⃣ **개발 (필수):** API 구현

### 상품 생성 API
- **상품명, 상품 설명, 담당자, 비밀번호**를 **Request body(`req.body`)**로 전달 받습니다.
**상품 ID**는 전달 받지 않고, 자동으로 생성합니다. (MongoDB Document 추가 시 기본 생성되는 `**_id**`를 사용해도 됩니다.)
- 상품은 두 가지 상태, **판매 중(`FOR_SALE`)및 판매 완료(`SOLD_OUT`)** 를 가질 수 있습니다.
- 상품 등록 시 기본 상태는 **판매 중(`FOR_SALE`)** 입니다.
- **생성 일시, 수정 일시**를 자동으로 생성합니다.

### 상품 목록 조회 API
- **상품 ID, 상품명, 상품 설명, 담당자, 상품 상태, 생성 일시, 수정 일시** 를 조회합니다.
- **비밀번호**를 포함하면 안됩니다.
- 상품 목록은 **생성 일시**를 기준으로 **내림차순(최신순)** 정렬합니다.

### 상품 상세 조회 API
- **상품 ID**를 **Path Parameter(`req.params`)**로 전달 받습니다.
- **상품 ID, 상품명, 상품 설명, 담당자, 상품 상태, 생성 일시, 수정 일시** 를 조회합니다.
- **비밀번호**를 포함하면 안됩니다.

### 상품 수정 API
- **상품 ID**를 **Path Parameter(`req.params`)**로 전달 받습니다.
- **상품명, 상품 설명, 담당자, 상품 상태, 비밀번호**를 **Request body(`req.body`)**로 전달 받습니다.
- **수정할 상품과 비밀번호 일치 여부를 확인**한 후, 동일할 때만 상품이 **수정**되어야 합니다. 일치하지 않을 경우, **“비밀번호가 일치하지 않습니다.”** 메세지를 반환합니다.

### 상품 삭제 API
- **상품 ID**를 **Path Parameter(`req.params`)**로 전달 받습니다.
- **비밀번호**를 **Request body(`req.body`)**로 전달 받습니다.
- **삭제할 상품과 비밀번호 일치 여부를 확인**한 후, 동일할 때만 글이 **삭제**되어야 합니다. 일치하지 않을 경우, **“비밀번호가 일치하지 않습니다.”** 메세지를 반환합니다.

## 3️⃣ **개발 (선택):** 유효성 검사 및 에러 처리
### 에러 처리 (에러 처리 미들웨어)
1. **상품 상세 조회, 수정, 삭제 시** **상품이 없는 경우**에는 “**상품이 존재하지 않습니다.**” 메세지를 반환합니다. **상품 목록 조회 시** **상품이 없는 경우**에는 **빈 배열(`[]`)을 반환**합니다.
2. **상품 생성 시** 입력 받은 상품명이 **기존에 등록 된 상품명과 동일한 경우**에는 **“이미 등록 된 상품입니다.”** 메세지를 반환합니다.
3. **그 밖의 에러가 발생했을 때**에는 **“예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.”** 메세지를 반환합니다.

### 유효성 검증 (Joi)
1. **상품 생성 시 정보가 빠진 경우**, **“OOO을(를) 입력해 주세요.”** 메시지를 반환합니다.
예) ****“상품명을 입력해 주세요”, “담당자를 입력해 주세요.” 등…
2. **상품 수정, 삭제 시 비밀번호가 없는 경우**, **“비밀번호를 입력해 주세요.”** 메세지를 반환합니다.
3. **상품 수정 시** 상품 상태에 `**FOR_SALE**`, `**SOLD_OUT**` 이 외의 다른 값이 입력된 경우, **“상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.”** 메세지를 반환합니다.

<aside>
👌 **그 밖의 추가적으로 개발해 보고 싶은 요소들은 얼마든지 추가해도 좋습니다.** 
**단, 개발 (필수) → 개발 (선택) 구현 이후 추가적인 개발을 진행해 주세요.**

</aside>

## 4️⃣ **테스트:** API Client로 동작 확인

1. [**Insomnia Client**](https://insomnia.rest/)를 이용하여 구현 한 모든 API가 정상 동작하는지 확인합니다.

## 5️⃣ **배포:** 누구나 이용할 수 있도록 하기

1. **[AWS EC2](https://ap-northeast-2.console.aws.amazon.com/ec2)** 인스턴스에 프로젝트를 배포합니다.
2. **[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)**를 이용해 터미널을 종료하더라도 서버가 실행될 수 있도록 설정합니다.
3. **[Gabia](https://gabia.com/)** 또는 **[AWS Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/)**을 이용해 도메인 주소를 연결한다면 더욱 좋습니다!
4. 배포된 **IP 주소** 또는 연결된 **도메인 주소**를 제출해주세요!