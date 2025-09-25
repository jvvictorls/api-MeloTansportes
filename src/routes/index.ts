import { Router } from 'express';
import UserRouter from './userRoutes';
import routesRoutes from './routesRoutes';
import extraRoutesRoutes from './extraRoutes';
import collaboratorsRoutes from './collaboratorsRoutes';
import authRouter from './authRoute';
import suppliesRoutes from './suppliesRoutes';

const router = Router();

router.use('/users', UserRouter);

router.use('/routes', routesRoutes);

router.use('/extra-routes', extraRoutesRoutes);

router.use('/collaborators', collaboratorsRoutes);

router.use('/auth', authRouter);

router.use('/supplies', suppliesRoutes);

export default router;
