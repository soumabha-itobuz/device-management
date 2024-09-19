import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { appEnv } from './env';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Define Zod Schemas
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  team: z.string().length(10),
});

const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
  email: z.string().email('Invalid email address').optional(),
});

// CREATE a new user
app.post('/users/create', async (req: Request, res: Response) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  const { name, email, team } = result.data;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        team,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// READ all users
app.get('/users/read', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// READ a single user
app.get('/users/read/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// UPDATE a user
app.put('/users/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  const { name, email } = result.data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE a user
app.delete('/users/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(appEnv.APPLICATION_PORT, () => {
  console.log(`API Server running at http://${appEnv.APPLICATION_URL}:${appEnv.APPLICATION_PORT}`);
});
