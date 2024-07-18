import IRoutesModel from "../Interfaces/Routes/IRoutesModel";
import { IRoutes } from "../Interfaces/Routes/IRoutes";
import SequelizeRoutes from "../database/models/sequelizeRoutes";
import SequelizeCollaborators from "../database/models/SequelizeCollaborators";

export default class RoutesModel implements IRoutesModel {
  private model = SequelizeRoutes;
  private collaboratorModel = SequelizeCollaborators;

  async findOneRoute(id: number): Promise<IRoutes | null> {
    const findRoute = await this.model.findByPk(id, {include: {model: SequelizeCollaborators, as: 'route', where:  { routeId: id } } }); ;
    if (!findRoute) return null;
    return findRoute.dataValues;
  }

  async addOneCollaborator(id: number, collaborators: string): Promise<IRoutes | null> {
    const [affectedRows] = await this.model.update({  }, { where: { id } });
    if (affectedRows < 0) return null;
    const updatedRoute = await this.findOneRoute(id);
    return updatedRoute;
  }
}