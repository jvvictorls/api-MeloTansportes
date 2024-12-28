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

  async findCollaboratorById(id: number): Promise<ICollaborators | null> {
    const collaborator = await this.model.findByPk(id);
    if (!collaborator) return null;
    return collaborator;
  }

  async findCollaboratorByName(name: string): Promise<ICollaborators | null> {
    const collaborator = await this.model.findOne({ where: { name } });
    if (!collaborator) return null;
    return collaborator.dataValues;
  }

  async getAllCollaborators(): Promise<ICollaborators[]> {
    const collaborators = await this.model.findAll();
    return collaborators.map((collaborator) => collaborator.dataValues);
  }

  async updateCollaboratorById(collaborator: ICollaborators): Promise<ICollaborators> {
    const updateCollaborator = await this.model.update(collaborator, {
      where: { id: collaborator.id },
      returning: true,
    });
    return updateCollaborator[1][0].dataValues;
  }
}
