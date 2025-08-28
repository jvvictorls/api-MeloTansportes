import { Request, Response, Router } from 'express';
import UsersController from '../controller/users.controller';
import ValidateAuth from '../middlewares/validateAuth';

const router = Router();
const usersController = new UsersController();
router.get(
  '/',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.findAll(req, res),
);

router.get(
  '/:id',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.findById(req, res),
);

router.post(
  '/email',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);

router.post(
  '/register',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.create(req, res),
);

router.put(
  '/:id',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.update(req, res),
);

router.delete(
  '/:id',
  ValidateAuth.validateAccessToken,
  (req: Request, res: Response) => usersController.delete(req, res),
);

export default router;
