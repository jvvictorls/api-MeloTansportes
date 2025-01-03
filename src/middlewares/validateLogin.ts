import { NextFunction, Request, Response } from 'express';
import JWT from '../Utils/JWT';

export default class Validations {
  static extractToken(token: string): string {
    return token.split(' ')[1];
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }
    const splitToken = Validations.extractToken(token);
    const validToken = JWT.verify(splitToken);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }

  static async validateLogin(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password must be provided' });
    }
    next();
  }
}
