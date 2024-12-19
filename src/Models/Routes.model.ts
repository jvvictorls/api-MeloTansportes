import IRoutesModel from '../Interfaces/Routes/IRoutesModel';
import { IRoutes } from '../Interfaces/Routes/IRoutes';
import SequelizeRoutes from '../database/models/sequelizeRoutes';
import SequelizeCollaborators from '../database/models/SequelizeCollaborators';

export default class RoutesModel implements IRoutesModel {
  private model = SequelizeRoutes;

  async getAllRoutes(): Promise<IRoutes[]> {
    const routes = await this.model.findAll({
      include: [
        {
          model: SequelizeCollaborators,
          as: 'collaborators',
          attributes: ['id', 'name', 'neighborhood', 'phone', 'boardingTime', 'department'],
          through: {
            attributes: [],
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
          attributes: ['id', 'name', 'neighborhood', 'phone', 'boardingTime', 'department'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return route;
  }
}
