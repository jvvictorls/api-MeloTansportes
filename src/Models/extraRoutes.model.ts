import SequelizeExtraRoutes from "../database/models/sequelizeExtraRoutes";
import SequelizeCollaborators from "../database/models/SequelizeCollaborators";
import SequelizeUsers from "../database/models/SequelizeUsers";
import IExtraRoutes from "../Interfaces/extraRoutes/IExtraRoutes";

export default class ExtraRoutesModel {
  private model = SequelizeExtraRoutes;

  async createExtraRoute(extraRoute: any): Promise<IExtraRoutes> {
    const newExtraRoute = await this.model.create(extraRoute);
    const typedExtraRoute: IExtraRoutes = {
      id: newExtraRoute.id,
      date: newExtraRoute.date,
      costCenter: newExtraRoute.costCenter,
      userId: newExtraRoute.userId,
      driver: newExtraRoute.driver,
      client: newExtraRoute.client,
      createdAt: newExtraRoute.createdAt,
      updatedAt: newExtraRoute.updatedAt,
      collaborators: extraRoute.collaborators?.map((collaborator: { 
          id: any; 
          name: any; 
          extra_routes_collaborators: { 
            createdAt: any; 
            updatedAt: any; 
            extraRouteId: any; 
            collaboratorId: any; 
          }; 
      }) => ({
        id: collaborator.id,
        name: collaborator.name,
        extra_routes_collaborators: {
          createdAt: collaborator.extra_routes_collaborators?.createdAt!,
          updatedAt: collaborator.extra_routes_collaborators?.updatedAt!,
          extra_route_id: collaborator.extra_routes_collaborators?.extraRouteId!,
          collaboratorId: collaborator.extra_routes_collaborators?.collaboratorId!
        }
      })) || [],
      user: extraRoute.user ? {
        id: extraRoute.user.id,
        name: extraRoute.user.name
      } : { id: null, name: null }
    };

    return typedExtraRoute;
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

  async getExtraRouteById(id: number): Promise<IExtraRoutes | null> {
    try {
      const extraRoute: IExtraRoutes | null = await SequelizeExtraRoutes.findOne({
        where: { id },
        include: [
          {
            model: SequelizeCollaborators,
            as: 'collaborators',
            through: { attributes: [] } // Excluir atributos da tabela de junção se não forem necessários
          },
          {
            model: SequelizeUsers,
            as: 'user'
          }
        ]
      });
  
      if (!extraRoute) {
        return null; // Retornar null se a rota não for encontrada
      }
  
      const transformedExtraRoute: IExtraRoutes = {
        id: extraRoute.id,
        date: extraRoute.date,
        costCenter: extraRoute.costCenter,
        userId: extraRoute.userId,
        driver: extraRoute.driver,
        client: extraRoute.client,
        createdAt: extraRoute.createdAt,
        updatedAt: extraRoute.updatedAt,
        collaborators: extraRoute.collaborators?.map(collaborator => ({
          id: collaborator.id,
          name: collaborator.name,
        })) || [],
        user: extraRoute.user ? {
          id: extraRoute.user.id,
          name: extraRoute.user.name
        } : { id: null, name: null }
      };
  
      return transformedExtraRoute;
    } catch (error) {
      console.error('Error fetching extra route by id:', error);
      throw error;
    }
  }
}