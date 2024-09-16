import express from 'express';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';
import { appEnv } from './env';
import { allAsset, createAsset, singleAsset } from './assets';

dotenv.config();

// const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is up...');
});

app.post('/create-asset', async (req, res) => {
  await createAsset(req, res);
});

app.get('/all-assets', async (req, res) => {
  await allAsset(req, res);
});

app.get('/assets/:uuid', async (req, res) => {
  await singleAsset(req, res);
});

// Start the server
app.listen(appEnv.APPLICATION_PORT, () => {
  console.log(`API Server running at http://${appEnv.APPLICATION_URL}:${appEnv.APPLICATION_PORT}`);
});
