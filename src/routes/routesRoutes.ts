import { Request, Response, Router } from 'express';
import RoutesController from '../controller/RoutesController';
import validateAuth from '../middlewares/validateAuth';

const router = Router();
const routesController = new RoutesController();
router.get(
  '/:id',
  (req: Request, res: Response) => routesController.getOneRoute(req, res),
);

router.get(
  '/',
  validateAuth.validateAccessToken,
  (req: Request, res:Response) => routesController.getAllRoutes(req, res),
);

router.patch(
  '/:routeId/remove/:collaboratorId',
  (req: Request, res: Response) => routesController.removeCollaboratorFromRoute(req, res),
);

router.patch(
  '/:routeId/add/:collaboratorId',
  (req: Request, res: Response) => routesController.addCollaboratorToRoute(req, res),
);
export default router;
