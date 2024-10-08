import ICollaborators from '../Interfaces/collaborators/ICollaborators';
import SequelizeCollaborators from '../database/models/SequelizeCollaborators';

export default class CollaboratorsModel {
  private model = SequelizeCollaborators;

  async createCollaborator(collaborator: ICollaborators): Promise<ICollaborators> {
    const newCollaborator = await this.model.create(collaborator);
    return newCollaborator.dataValues;
  }

  async createManyCollaborators(collaborators: ICollaborators[]): Promise<ICollaborators[]> {
    const newCollaborators = await this.model.bulkCreate(collaborators);
    return newCollaborators.map((collaborator) => collaborator.dataValues);
  }

  async getAllCollaborators(): Promise<ICollaborators[]> {
    const collaborators = await this.model.findAll();
    return collaborators.map((collaborator) => collaborator.dataValues);
  }
}
