import SequelizeExtraRoutes from '../database/models/sequelizeExtraRoutes';
import SequelizeCollaborators from '../database/models/SequelizeCollaborators';
import SequelizeUsers from '../database/models/SequelizeUsers';
import IExtraRoutes from '../Interfaces/extraRoutes/IExtraRoutes';
import INewExtraRoute from '../Interfaces/extraRoutes/INewExtraRoute';

export default class ExtraRoutesModel {
  private model = SequelizeExtraRoutes;

  async createExtraRoute(data: INewExtraRoute): Promise<IExtraRoutes> {
    console.log(data);
    try {
      const extraRoute = await this.model.create(
        {
          origin: data.origin,
          destination: data.destination,
          time: data.time,
          costCenter: data.costCenter,
          date: data.date,
          userId: data.userId,
          driver: data.driver,
          client: data.client,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      );

      if (data.collaborators && data.collaborators.length > 0) {
        const collaborators = await SequelizeCollaborators.findAll({
          where: {
            id: data.collaborators.map((collaborator) => collaborator.id),
          },
        });
        await (extraRoute as SequelizeExtraRoutes & { addCollaborators: Function }).addCollaborators(collaborators);
      }

      await extraRoute.reload({
        include: [
          { model: SequelizeCollaborators, as: 'collaborators' },
          { model: SequelizeUsers, as: 'user' },
        ],
      });

      const transformedExtraRoute: IExtraRoutes = {
        id: extraRoute.id,
        origin: extraRoute.origin,
        destination: extraRoute.destination,
        date: extraRoute.date,
        time: extraRoute.time,
        costCenter: extraRoute.costCenter,
        userId: extraRoute.userId,
        driver: extraRoute.driver,
        client: extraRoute.client,
        status: extraRoute.status,
        createdAt: extraRoute.createdAt,
        updatedAt: extraRoute.updatedAt,
        collaborators: extraRoute.collaborators?.map((collaborator) => ({
          id: collaborator.id,
          name: collaborator.name,
          extra_routes_collaborators: {
            createdAt: collaborator.extra_routes_collaborators?.createdAt!,
            updatedAt: collaborator.extra_routes_collaborators?.updatedAt!,
            extra_route_id: collaborator.extra_routes_collaborators?.extra_route_id!,
            collaboratorId: collaborator.extra_routes_collaborators?.collaboratorId!,
          },
        })) || [],
        user: {
          id: extraRoute.user.id,
          name: extraRoute.user.name,
        },
      };

      return transformedExtraRoute;
    } catch (error) {
      console.error('Error creating extra route:', error);
      throw error;
    }
  }

  async getExtraRouteById(id: number): Promise<IExtraRoutes | null> {
    try {
      const extraRoute: IExtraRoutes | null = await this.model.findOne({
        where: { id },
        include: [
          {
            model: SequelizeCollaborators,
            as: 'collaborators',
            through: { attributes: [] }, // Excluir atributos da tabela de junção se não forem necessários
          },
          {
            model: SequelizeUsers,
            as: 'user',
          },
        ],
      });

      if (!extraRoute) {
        return null; // Retornar null se a rota não for encontrada
      }

      const transformedExtraRoute: IExtraRoutes = {
        origin: extraRoute.origin,
        destination: extraRoute.destination,
        id: extraRoute.id,
        date: extraRoute.date,
        time: extraRoute.time,
        costCenter: extraRoute.costCenter,
        userId: extraRoute.userId,
        driver: extraRoute.driver,
        client: extraRoute.client,
        status: extraRoute.status,
        createdAt: extraRoute.createdAt,
        updatedAt: extraRoute.updatedAt,
        collaborators: extraRoute.collaborators?.map((collaborator) => ({
          id: collaborator.id,
          name: collaborator.name,
        })) || [],
        user: {
          id: extraRoute.user.id,
          name: extraRoute.user.name,
        },
      };

      return transformedExtraRoute;
    } catch (error) {
      console.error('Error fetching extra route by id:', error);
      throw error;
    }
  }
}
