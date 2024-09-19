import { Request, Response, NextFunction } from 'express';
// import jwt from 'jwt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Store securely in environment variables

// Middleware to verify the JWT token
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = payload.userId; // Attach userId to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}
