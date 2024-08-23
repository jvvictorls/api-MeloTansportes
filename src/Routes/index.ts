import { Router } from 'express';
import UserRouter from './UserRoutes';
import routesRoutes from './routesRoutes';
import extraRoutesRoutes from './ExtraRoutes'

const router = Router();

router.use('/users', UserRouter);

router.use('/routes', routesRoutes);

router.use('/extra-routes', extraRoutesRoutes);

export default router;
