import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
