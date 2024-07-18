import RoutesModel from "../Models/Routes.model";
import { ServiceMessage, ServiceResponse } from "../Interfaces/Users/ServiceResponse";
import { IRoutes } from "../Interfaces/Routes/IRoutes";
import IRoutesModel from "../Interfaces/Routes/IRoutesModel";

export default class RoutesService {
  constructor (
    private routesModel: IRoutesModel = new RoutesModel()
  ) {}
  
  async getOneRoute(id: number): Promise<ServiceResponse<IRoutes>> {
    const route = await this.routesModel.findOneRoute(id);
    if (!route) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No route found' }
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: route
    };
  }
}