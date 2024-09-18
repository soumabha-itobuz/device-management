import { cleanEnv, num, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();
export const appEnv = cleanEnv(process.env, {
  APPLICATION_PORT: num({ default: 4000 }),
  APPLICATION_URL: str({ default: 'localhost' }),
  DATABASE_URL: str({ desc: 'mongodb+srv://soumabha:1234@cluster0.dz4j9.mongodb.net/' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'], default: 'development' }),
});
