import { NextFunction, Request, Response } from 'express';
import CollaboratorsModel from '../models/collaborators.model';
import ICollaborators from '../Interfaces/collaborators/ICollaborators';

class ValidateCollaborators {
  private collaboratorsModel = new CollaboratorsModel();

  public validateIfCollaboratorsAlreadyExists = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const collaborators: ICollaborators[] = req.body;
    const collaboratorsFromDb = await this.collaboratorsModel.getAllCollaborators();
    const collaboratorExists = collaborators
      .filter((collaborator) => collaboratorsFromDb
        .some((collaboratorFromDb) => collaborator.name === collaboratorFromDb.name))
      .map((existingCollaborators) => existingCollaborators.name);
    if (collaboratorExists.length > 0) {
      return res.status(409).json({
        message: `The Collaborators ${collaboratorExists} already exists` });
    }
    next();
  };
}

export default ValidateCollaborators;
