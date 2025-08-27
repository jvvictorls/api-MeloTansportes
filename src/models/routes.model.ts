import IRoutesModel from '../Interfaces/Routes/IRoutesModel';
import { IRoutes } from '../Interfaces/Routes/IRoutes';
import SequelizeRoutes from '../database/models/SequelizeRoutes';
import SequelizeCollaborators from '../database/models/SequelizeCollaborators';

export default class RoutesModel implements IRoutesModel {
  private model = SequelizeRoutes;
  private collaboratorModel = SequelizeCollaborators;

  async getAllRoutes(): Promise<IRoutes[]> {
    const routes = await this.model.findAll({
      include: [
        {
          model: SequelizeCollaborators,
          foreignKey: 'routeId',
          as: 'collaborators',
          attributes: ['id', 'name', 'neighborhood', 'phone', 'department'],
          through: {
            attributes: ['boarding_time'],
          },
        },
      ],
    });
    return routes;
  }

  async getRouteById(id: number): Promise<IRoutes | null> {
    const route = await this.model.findByPk(id, {
      include: [
        {
          model: SequelizeCollaborators,
          as: 'collaborators',
          attributes: ['id', 'name', 'neighborhood', 'phone', 'department',
          ],
          through: {
            attributes: ['boarding_time'],
          },
        },
      ],
    });
    return route;
  }

  async removeCollaboratorFromRoute(
    routeId: number,
    collaboratorId: number,
  ) {
    const route = await this.model.findByPk(routeId);
    if (!route) return null;
    route.removeCollaborator(collaboratorId);
    const updatedRoute = await this.model.findByPk(routeId, {
      include: [{
        model: SequelizeCollaborators,
        as: 'collaborators',
        attributes: ['name'],
        through: { attributes: [] },
      }],
    });
    return updatedRoute;
  }

  async addCollaboratorToRoute(
    routeId: number,
    collaboratorId: number,
  ): Promise<IRoutes | null> {
    const collaborator = await this.collaboratorModel.findByPk(collaboratorId);
    if (!collaborator) return null;
    const route = await this.model.findByPk(routeId);
    if (!route) return null;
    route.addCollaborator(collaboratorId);
    const updatedRoute = await this.model.findByPk(routeId, {
      include: [{
        model: SequelizeCollaborators,
        as: 'collaborators',
        attributes: ['name'],
        through: { attributes: [] },
      }],
    });
    return updatedRoute;
  }
}
