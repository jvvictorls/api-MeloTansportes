import { Router } from 'express';
import UserRouter from './UserRoutes';
import RoutesController from './routesRoutes';

const router = Router();

router.use('/users', UserRouter);

router.use('/routes', RoutesController);

export default router;
