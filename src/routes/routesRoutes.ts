import { Request, Response, Router } from 'express';
import RoutesController from '../controller/routesController';
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
  validateAuth.validateAccessToken,
  (req: Request, res: Response) => routesController.removeCollaboratorFromRoute(req, res),
);

router.patch(
  '/:routeId/add/:collaboratorId',
  validateAuth.validateAccessToken,
  (req: Request, res: Response) => routesController.addCollaboratorToRoute(req, res),
);

router.patch(
  '/:routeId/last-update',
  validateAuth.validateAccessToken,
  (req: Request, res: Response) => routesController.updateLastUpdate(req, res),
);
export default router;
