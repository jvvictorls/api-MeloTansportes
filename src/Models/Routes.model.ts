import IRoutesModel from '../Interfaces/Routes/IRoutesModel';
import { IRoutes } from '../Interfaces/Routes/IRoutes';
import SequelizeRoutes from '../database/models/sequelizeRoutes';
import SequelizeCollaborators from '../database/models/SequelizeCollaborators';

export default class RoutesModel implements IRoutesModel {
  private model = SequelizeRoutes;

  async findOneRoute(id: number): Promise<IRoutes | null> {
    const findRoute = await this.model.findByPk(
      id,
      { include:
        {
          model: SequelizeCollaborators,
          as: 'collaborators',
          where: { arrivalRouteId: id },
        },
      },
    );
    if (!findRoute) return null;
    return findRoute.dataValues;
  }

  async getAllRoutes(): Promise<IRoutes[]> {
    const allRoutes = await this.model.findAll(
      {
        include:
        {
          model: SequelizeCollaborators,
          as: 'collaborators',
        },
      },
    );
    return allRoutes.map((route) => route.dataValues);
  }
}
