import { Router } from 'express';
import UserRouter from './UserRoutes';
import routesRoutes from './routesRoutes';
import extraRoutesRoutes from './ExtraRoutes'
import collaboratorsRoutes from './CollaboratorsRoutes';

const router = Router();

router.use('/users', UserRouter);

router.use('/routes', routesRoutes);

router.use('/extra-routes', extraRoutesRoutes);

router.use('/collaborators', collaboratorsRoutes);

export default router;
