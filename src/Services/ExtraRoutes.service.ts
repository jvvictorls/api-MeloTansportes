import ExtraRoutesModel from '../Models/extraRoutes.model';
import { ServiceResponse } from '../Utils/serviceResponse';
import INewExtraRoute from '../Interfaces/extraRoutes/INewExtraRoute';

export default class ExtraRoutesService {
  private extraRoutesModel = new ExtraRoutesModel();

  async createExtraRoute(extraRoute: INewExtraRoute): Promise<ServiceResponse<INewExtraRoute>> {
    try {
      const newExtraRoute = await this.extraRoutesModel.createExtraRoute(extraRoute);
      return { data: newExtraRoute, status: 'CREATED' };
    } catch (e: any) {
      return e.message;
    }
  }

  async getExtraRouteById(id: number): Promise<any> {
    return this.extraRoutesModel.getExtraRouteById(id);
  }
}
