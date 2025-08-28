import { Request, Response, Router } from 'express';
import CollaboratorsController from '../controller/collaborators.controller';
import ValidateCollaborators from '../middlewares/validateCollaborators';
import ValidateAuth from '../middlewares/validateAuth';

const router = Router();
const collaboratorsController = new CollaboratorsController();
const validateCollaborators = new ValidateCollaborators();

router.get(
  '/',
  ValidateAuth.validateAccessToken,
  async (req: Request, res: Response) => collaboratorsController.getAllCollaborators(req, res),
);

router.post(
  '/',
  ValidateAuth.validateAccessToken,
  async (req: Request, res: Response) =>
    collaboratorsController.createCollaborator(req, res),
);

router.post(
  '/many',
  ValidateAuth.validateAccessToken,
  validateCollaborators.validateIfCollaboratorsAlreadyExists,
  async (req: Request, res: Response) =>
    collaboratorsController.createManyCollaborators(req, res),
);

router.put(
  '/:id',
  ValidateAuth.validateAccessToken,
  async (req: Request, res: Response) =>
    collaboratorsController.updateCollaboratorById(req, res),
);

export default router;
