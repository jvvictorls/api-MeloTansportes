import { Router, Request, Response } from 'express';
import AuthController from '../Controller/auth.Controller';

const router = Router();
const authController = new AuthController();

router.post(
  '/login',
  (req: Request, res: Response) => authController.login(req, res),
);

router.post(
  '/refresh-token',
  (req: Request, res: Response) => authController.refreshAccessToken(req, res),
);

router.delete(
  '/logout',
  (req: Request, res: Response) => authController.logout(req, res),
);

export default router;
