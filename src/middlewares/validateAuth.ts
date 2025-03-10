import { Request, Response, NextFunction } from 'express';
import JWT from '../Utils/JWT';

class ValidateAuth {
  static async validateAccessToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
      }
      const decoded = JWT.verify(token); // Aqui pode lançar erro se o token for inválido
      req.user = decoded; // Salva as informações do usuário no request
      next(); // Chama o próximo middleware
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }
}

export default ValidateAuth;
