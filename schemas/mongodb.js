// /schemas/mongodb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const{MONGO_URL}=process.env;

const connect = () => {
  mongoose
    .connect(
      MONGO_URL,
      {
        dbName: 'GOODS_SHOP', // GOODS_SHOP 데이터베이스명을 사용합니다.
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;