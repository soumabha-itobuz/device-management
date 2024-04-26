import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { appEnv } from './env';

const app = express();
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  console.log('hello world');
  res.send('Hello, TypeScript Express!');
});

app.listen(appEnv.APPLICATION_PORT, () => {
  console.log(`API Server running at http://${appEnv.APPLICATION_URL}:${appEnv.APPLICATION_PORT}`);
});
