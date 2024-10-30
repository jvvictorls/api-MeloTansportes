import CollaboratorsModel from '../Models/collaborators.model';
import ICollaborators from '../Interfaces/collaborators/ICollaborators';
import { ServiceResponse } from '../Utils/serviceResponse';

export default class CollaboratorsService {
  private collaboratorsModel = new CollaboratorsModel();

  async createCollaborator(collaborator: ICollaborators): Promise<ServiceResponse<ICollaborators>> {
    const checkIfCollaboratorExists = await this.collaboratorsModel
      .findCollaboratorByName(collaborator.name);
    if (checkIfCollaboratorExists) {
      return {
        status: 'CONFLICT',
        data: { message: 'Parece já existir um colaborador com esse nome' },
      };
    }
    const newCollaborator = await this.collaboratorsModel.createCollaborator(collaborator);
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
