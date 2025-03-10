import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static async validateLogin(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password must be provided' });
    }
    next();
  }
}
