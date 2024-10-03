import { Request, Response } from 'express';
import CollaboratorsService from '../Services/Collaborators.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

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
    const response = await this.collaboratorsService.createManyCollaborators(collaborators);
    return res.status(response.status === 'CREATED' ? 201 : 409).json(response);
  }

  async updateCollaboratorRoute(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const { status, data } = await this.collaboratorsService
      .updateCollaboratorRoute(name, Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }

  async getAllCollaborators(req: Request, res: Response) {
    const { status, data } = await this.collaboratorsService.getAllCollaborators();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}
