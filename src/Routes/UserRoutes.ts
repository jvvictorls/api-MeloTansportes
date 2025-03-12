import { Request, Response, Router } from 'express';
import UsersController from '../Controller/Users.controller';
// import validateLogin from '../middlewares/validateLogin';

const router = Router();
const usersController = new UsersController();
router.get(
  '/',
  (req: Request, res: Response) => usersController.findAll(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => usersController.findById(req, res),
);

router.post(
  '/email',
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);

router.post(
  '/signup',
  (req: Request, res: Response) => usersController.create(req, res),
);

router.put(
  '/:id',
  (req: Request, res: Response) => usersController.update(req, res),
);

router.delete(
  '/:id',
  (req: Request, res: Response) => usersController.delete(req, res),
);

export default router;
