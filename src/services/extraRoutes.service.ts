import ExtraRoutesModel from '../models/extraRoutes.model';
import { ServiceResponse } from '../utils/serviceResponse';
import INewExtraRoute from '../Interfaces/extraRoutes/INewExtraRoute';

export default class ExtraRoutesService {
  private extraRoutesModel = new ExtraRoutesModel();

  getRoutePrice(collaborators: INewExtraRoute['collaborators']): number {
    if(collaborators.length === 1) {
      return 125.84;
    }
    if(collaborators.length === 2) {
      return 188.77;
    }
    if (collaborators.length >= 3 && collaborators.length <= 5) {
      return 262.18;
    }
    if (collaborators.length > 5 && collaborators.length <= 6) {
      return 377.53;
    }
    if(collaborators.length > 6 && collaborators.length <= 16) {
      return 786.53;
    }
    return 0;
  }


  async createExtraRoute(extraRoute: INewExtraRoute): Promise<ServiceResponse<INewExtraRoute>> {
    try {
      extraRoute.price = this.getRoutePrice(extraRoute.collaborators);
      if(extraRoute.price === 0) {
        throw new Error('Número de colaboradores inválido para rota extra');
      }
      const newExtraRoute = await this.extraRoutesModel.createExtraRoute(extraRoute);
      return { data: newExtraRoute, status: 'CREATED' };
    } catch (e: any) {
      return e.message;
    }
  }

  async getExtraRouteById(id: number): Promise<any> {
    return this.extraRoutesModel.getExtraRouteById(id);
  }

  async getExtraRoutes(): Promise<any> {
    return this.extraRoutesModel.getExtraRoutes();
  }
}
