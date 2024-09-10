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

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// CREATE a new user
app.post('/users', (req: Request, res: Response) => {
  const newUser: User = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ all users
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// READ a single user
app.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// UPDATE a user
app.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedUser: User = req.body;
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...updatedUser, id }; // Keep the original id
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
app.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});
