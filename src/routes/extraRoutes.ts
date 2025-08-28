import { Router, Request, Response } from 'express';
import ExtraRoutesController from '../controller/extraRoutes.controller';
import ValidateAuth from '../middlewares/validateAuth';

const router = Router();
const extraRoutesController = new ExtraRoutesController();

router.get(
  '/:id',
  ValidateAuth.validateAccessToken,
  async (req: Request, res: Response) =>
    extraRoutesController.getExtraRouteById(req, res),
);

router.post(
  '/',
  ValidateAuth.validateAccessToken,
  async (req: Request, res: Response) =>
    extraRoutesController.createExtraRoute(req, res),
);

export default router;
