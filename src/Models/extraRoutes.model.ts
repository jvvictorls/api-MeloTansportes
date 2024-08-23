import SequelizeExtraRoutes from "../database/models/sequelizeExtraRoutes";
import SequelizeCollaborators from "../database/models/SequelizeCollaborators";
import SequelizeUsers from "../database/models/SequelizeUsers";

export default class ExtraRoutesModel {
  private model = SequelizeExtraRoutes;

  async createExtraRoute(extraRoute: any): Promise<any> {
    const newExtraRoute = await this.model.create(extraRoute);
    return newExtraRoute.dataValues;
  }

  async getExtraRoutes(): Promise<any[]> {
    const extraRoutes = await this.model.findAll({include: [
      {
        model: SequelizeCollaborators,
        as: 'collaborators',
        attributes: ['id', 'name'],
      },
      {
        model: SequelizeUsers,
        as: 'user',
        attributes: ['id', 'name'],
        
      }
    ]});
    return extraRoutes.map((extraRoute) => extraRoute.dataValues);
  }

  async getExtraRouteById(id: number): Promise<any> {
    const extraRoute = await this.model.findByPk(id, {
      include: [
        {
          model: SequelizeCollaborators,
          as: 'collaborators',
          attributes: ['id', 'name',],
        },
        {
          model: SequelizeUsers,
          as: 'user',
          attributes: ['id', 'name'],
        }
      ]
    });
    if (!extraRoute) {
      return null;
    }
    return extraRoute.dataValues;
  }
}