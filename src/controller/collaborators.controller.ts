import { Request, Response } from 'express';
import CollaboratorsService from '../services/collaborators.service';
import mapStatusHTTP from '../utils/mapStatusHttp';

export default class CollaboratorsController {
  private collaboratorsService = new CollaboratorsService();

  async createCollaborator(req: Request, res: Response) {
    const collaborator = req.body;
    const { status, data } = await this.collaboratorsService.createCollaborator(collaborator);
    if (status !== 'CREATED') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(201).json(data);
  }

  async createManyCollaborators(req: Request, res: Response) {
    const collaborators = req.body;
    const { status, data } = await this.collaboratorsService.createManyCollaborators(collaborators);
    if (status !== 'CREATED') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(201).json(data);
  }

  async getAllCollaborators(req: Request, res: Response) {
    const { status, data } = await this.collaboratorsService.getAllCollaborators();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  async updateCollaboratorById(req: Request, res: Response) {
    const collaborator = req.body;
    await this.collaboratorsService.findCollaboratorById(collaborator.id);
    const { status, data } = await this.collaboratorsService.updateCollaboratorById(collaborator);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
