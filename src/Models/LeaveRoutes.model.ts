import SequelizeLeaveRoutes from '../database/models/SequelizeLeaveRoutes';
import INewLeaveRoutes from '../Interfaces/leaveRoutes/INewLeaveRoutes';

export default class OutboundRoutes {
  private leaveRoutes = SequelizeLeaveRoutes;

  async getLeaveRoutes() {
    const leaveRoutes = await this.leaveRoutes.findAll({
      include: {
        association: 'collaborators',
        attributes: ['name'],
      },
    });
    return leaveRoutes;
  }

  async getLeaveRouteById(id: number) {
    const leaveRoute = await this.leaveRoutes.findByPk(id, {
      include: {
        association: 'collaborators',
        attributes: ['name'],
      },
    });
    return leaveRoute;
  }

  async createLeaveRoute(leaveRoute: INewLeaveRoutes) {
    const newLeaveRoute = await this.leaveRoutes.create(leaveRoute);
    return newLeaveRoute;
  }

  async updateLeaveRoute(id: number, leaveRoute: INewLeaveRoutes) {
    const findRoute = await this.leaveRoutes.findByPk(id);
    if (!findRoute) {
      return null;
    }
    const [affectedCount] = await this.leaveRoutes.update(leaveRoute, {
      where: { id: findRoute.id },
    });
    if (affectedCount > 0) {
      return leaveRoute;
    }
    return null;
  }

  async deleteLeaveRoute(id: number) {
    const route = await this.leaveRoutes.findByPk(id);
    if (!route) {
      return null;
    }
    await this.leaveRoutes.destroy({
      where: { id: route.id },
    });
  }
}
