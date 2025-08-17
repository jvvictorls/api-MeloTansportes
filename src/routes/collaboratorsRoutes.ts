import { Request, Response, Router } from 'express';
import CollaboratorsController from '../controller/collaborators.controller';
import ValidateCollaborators from '../middlewares/validateCollaborators';

const router = Router();
const collaboratorsController = new CollaboratorsController();
const validateCollaborators = new ValidateCollaborators();

router.get('/', async (req: Request, res: Response) =>
  collaboratorsController.getAllCollaborators(req, res));

router.post('/', async (req: Request, res: Response) =>
  collaboratorsController.createCollaborator(req, res));

router.post(
  '/many',
  validateCollaborators.validateIfCollaboratorsAlreadyExists,
  async (req: Request, res: Response) =>
    collaboratorsController.createManyCollaborators(req, res),
);

router.put('/:id', async (req: Request, res: Response) =>
  collaboratorsController.updateCollaboratorById(req, res));

export default router;
