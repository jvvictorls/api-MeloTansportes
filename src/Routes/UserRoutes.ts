import { Request, Response, Router } from 'express';
import UsersController from '../Controller/Users.controller';
import validateLogin from '../middlewares/validateLogin';

const router = Router();
const usersController = new UsersController();
router.get(
  '/',
  validateLogin.validateToken,
  (req: Request, res: Response) => usersController.findAll(req, res),
);

router.get(
  '/:id',
  validateLogin.validateToken,

  (req: Request, res: Response) => usersController.findById(req, res),
);

router.post(
  '/signup',
  (req: Request, res: Response) => usersController.create(req, res),
);

router.put(
  '/:id',
  validateLogin.validateToken,
  (req: Request, res: Response) => usersController.update(req, res),
);

router.delete(
  '/:id',
  validateLogin.validateToken,
  (req: Request, res: Response) => usersController.delete(req, res),
);

router.post(
  '/login',
  (req: Request, res: Response) => usersController.login(req, res),
);

export default router;
