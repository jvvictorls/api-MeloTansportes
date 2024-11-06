import { Request, Response, Router } from 'express';
import LeaveRoutesController from '../Controller/LeaveRoutes.controller';

const router = Router();
const leaveRoutesController = new LeaveRoutesController();
router.get(
  '/',
  (req: Request, res: Response) => leaveRoutesController.getLeaveRoutes(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => leaveRoutesController.getLeaveRouteById(req, res),
);

router.put(
  '/:id',
  (req: Request, res: Response) => leaveRoutesController.updateLeaveRoute(req, res),
);

router.post(
  '/',
  (req: Request, res: Response) => leaveRoutesController.createLeaveRoute(req, res),
);

router.delete(
  '/:id',
  (req: Request, res: Response) => leaveRoutesController.deleteLeaveRoutes(req, res),
);

export default router;
