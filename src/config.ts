import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT,
	isProduction: process.env.NODE_ENV === 'production',
};
