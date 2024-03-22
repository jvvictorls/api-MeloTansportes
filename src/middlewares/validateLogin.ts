import { NextFunction, Request, Response } from 'express';
import JWT from '../Utils/JWT';

export default class Validations {
  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }
    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}
