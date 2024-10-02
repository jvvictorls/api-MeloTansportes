import CollaboratorsModel from '../Models/collaborators.model';
import ICollaborators from '../Interfaces/collaborators/ICollaborators';
import { ServiceResponse } from '../Utils/serviceResponse';

export default class CollaboratorsService {
  private collaboratorsModel = new CollaboratorsModel();

  async createCollaborator(collaborator: ICollaborators): Promise<ServiceResponse<ICollaborators>> {
    const newCollaborator = await this.collaboratorsModel.createCollaborator(collaborator);
    if (!newCollaborator) {
      return { status: 'CONFLICT', data: { message: 'Collaborator already exists' } };
    }
    return { status: 'CREATED', data: newCollaborator };
  }

  async createManyCollaborators(collaborators: ICollaborators[]):
  Promise<ServiceResponse<ICollaborators[]>> {
    const newCollaborators = await this.collaboratorsModel.createManyCollaborators(collaborators);
    if (!newCollaborators) {
      return { status: 'CONFLICT', data: { message: 'Collaborators already exists' } };
    }
    return { status: 'CREATED', data: newCollaborators };
  }

  async getAllCollaborators(): Promise<ServiceResponse<ICollaborators[]>> {
    const collaborators = await this.collaboratorsModel.getAllCollaborators();
    if (!collaborators) {
      return { status: 'NOT_FOUND', data: { message: 'Collaborators not found' } };
    }
    return { status: 'SUCCESSFUL', data: collaborators };
  }
}
