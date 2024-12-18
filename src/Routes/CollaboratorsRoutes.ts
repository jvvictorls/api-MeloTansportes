import { Request, Response, Router } from 'express';
import CollaboratorsController from '../Controller/Collaborators.controller';

const router = Router();
const collaboratorsController = new CollaboratorsController();

router.get('/', async (req: Request, res: Response) =>
  collaboratorsController.getAllCollaborators(req, res));

router.post('/', async (req: Request, res: Response) =>
  collaboratorsController.createCollaborator(req, res));

export default router;
