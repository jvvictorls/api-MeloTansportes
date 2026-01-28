import RoutesModel from '../models/routes.model';
import { ServiceResponse } from '../utils/serviceResponse';
import { IRoutes, RoutesFromDb } from '../Interfaces/Routes/IRoutes';

const NOT_FOUND = 'No route found';

export default class RoutesService {
  constructor(
    private routesModel: RoutesModel = new RoutesModel(),
  ) {}

  async getAllRoutes(): Promise<ServiceResponse<RoutesFromDb[]>> {
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

  async getOneRoute(id: number): Promise<ServiceResponse<RoutesFromDb>> {
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

  async getRouteByName(name: string): Promise<ServiceResponse<RoutesFromDb>> {
    const routes = await this.routesModel.getAllRoutes();
    const findRouteByCollaboratorName = routes.filter((route: RoutesFromDb) => route.collaborators
      ?.some((collaborator) => collaborator.name.toLowerCase().includes(name.toLowerCase())));
    if (findRouteByCollaboratorName.length < 1) {
      return {
        status: 'NOT_FOUND',
        data: { message: NOT_FOUND },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: findRouteByCollaboratorName[0],
    };
  }

  async removeCollaboratorFromRoute(
    routeId: number,
    collaboratorId: number,
  ): Promise<ServiceResponse<RoutesFromDb>> {
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
  ): Promise<ServiceResponse<RoutesFromDb>> {
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

  async updateLastUpdate(routeId: number): Promise<ServiceResponse<RoutesFromDb>> {
    await this.getOneRoute(routeId);
    const updatedRoute = await this.routesModel.updateLastUpdate(routeId);
    if (!updatedRoute) {
      return {
        status: 'NOT_FOUND',
        data: { message: NOT_FOUND },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: updatedRoute,
    };
  }
}
