// /schemas/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const{MONGODB_URL}=process.env;

const connect = () => {
  mongoose
    .connect(
      process.env.MONGODB_URL,
      {
        dbName: process.env.MONGODB_NAME, // 데이터베이스명
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;