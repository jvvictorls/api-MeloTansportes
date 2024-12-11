import RoutesModel from '../Models/Routes.model';
import { ServiceResponse } from '../Utils/serviceResponse';
import { IRoutes } from '../Interfaces/Routes/IRoutes';

export default class RoutesService {
  constructor(
    private routesModel: RoutesModel = new RoutesModel(),
  ) {}

  async getAllRoutes(): Promise<ServiceResponse<IRoutes[]>> {
    const routes = await this.routesModel.getAllRoutes();
    if (routes.length < 1) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No routes found' },
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
}
