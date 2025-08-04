import RoutesModel from '../models/routes.model';
import { ServiceResponse } from '../utils/serviceResponse';
import { IRoutes } from '../Interfaces/Routes/IRoutes';

const NOT_FOUND = 'No route found';

export default class RoutesService {
  constructor(
    private routesModel: RoutesModel = new RoutesModel(),
  ) {}

  async getAllRoutes(): Promise<ServiceResponse<IRoutes[]>> {
    const routes = await this.routesModel.getAllRoutes();
    if (routes.length < 1) {
      return {
        status: 'NOT_FOUND',
        data: { message: NOT_FOUND },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: routes,
    };
  }

  async getOneRoute(id: number): Promise<ServiceResponse<IRoutes>> {
    const route = await this.routesModel.getRouteById(id);
    if (!route) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No route found' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: route,
    };
  }

  async removeCollaboratorFromRoute(
    routeId: number,
    collaboratorId: number,
  ): Promise<ServiceResponse<IRoutes>> {
    const route = await this.routesModel.removeCollaboratorFromRoute(
      routeId,
      collaboratorId,
    );
    if (!route) {
      return {
        status: 'NOT_FOUND',
        data: { message: NOT_FOUND },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: route,
    };
  }

  async addCollaboratorToRoute(
    routeId: number,
    collaboratorId: number,
  ): Promise<ServiceResponse<IRoutes>> {
    const route = await this.routesModel.addCollaboratorToRoute(
      routeId,
      collaboratorId,
    );
    if (!route) {
      return {
        status: 'NOT_FOUND',
        data: { message: NOT_FOUND },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: route,
    };
  }
}
