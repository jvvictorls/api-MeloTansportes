import {
  ICollaboratorsCreate,
  ICollaborators,
  ICollaboratorsUpdate } from '../Interfaces/collaborators/ICollaborators';
import CollaboratorsModel from '../models/collaborators.model';
import { ServiceResponse } from '../utils/serviceResponse';

export default class CollaboratorsService {
  private collaboratorsModel = new CollaboratorsModel();

  async createCollaborator(collaborator: ICollaboratorsCreate)
    : Promise<ServiceResponse<ICollaborators>> {
    const checkIfCollaboratorExists = await this.collaboratorsModel
      .findCollaboratorByName(collaborator.name);
    if (checkIfCollaboratorExists) {
      return {
        status: 'CONFLICT',
        data: { message: 'Already exists a collaborator with this name' },
      };
    }
    const newCollaborator = await this.collaboratorsModel.createCollaborator(collaborator);
    return { status: 'CREATED', data: newCollaborator };
  }

  async createManyCollaborators(collaborators: ICollaboratorsCreate[]):
  Promise<ServiceResponse<ICollaborators[]>> {
    const newCollaborators = await this.collaboratorsModel.createManyCollaborators(collaborators);
    return { status: 'CREATED', data: newCollaborators };
  }

  async getAllCollaborators(): Promise<ServiceResponse<ICollaborators[]>> {
    const collaborators = await this.collaboratorsModel.getAllCollaborators();
    if (!collaborators) {
      return { status: 'NOT_FOUND', data: { message: 'Collaborators not found' } };
    }
    return { status: 'SUCCESSFUL', data: collaborators };
  }

  async findCollaboratorById(id: number): Promise<ServiceResponse<ICollaborators>> {
    const collaborator = await this.collaboratorsModel.findCollaboratorById(id);
    if (!collaborator) {
      return { status: 'NOT_FOUND', data: { message: 'Collaborator not found' } };
    }
    return { status: 'SUCCESSFUL', data: collaborator };
  }

  async updateCollaboratorById(collaborator: ICollaboratorsUpdate):
  Promise<ServiceResponse<ICollaborators>> {
    await this.findCollaboratorById(collaborator.id);
    const updatedCollaborator = await this
      .collaboratorsModel.updateCollaboratorById(collaborator);
    if (!updatedCollaborator) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'It was not possible to update the collaborator' },
      };
    }
    return { status: 'SUCCESSFUL', data: updatedCollaborator };
  }
}
