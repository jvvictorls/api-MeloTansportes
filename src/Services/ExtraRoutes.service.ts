import ExtraRoutesModel from "../Models/extraRoutes.model";

export default class ExtraRoutesService {
  private extraRoutesModel = new ExtraRoutesModel();

  async createExtraRoute(extraRoute: any): Promise<any> {
    return this.extraRoutesModel.createExtraRoute(extraRoute);
  }

  async getExtraRoutes(): Promise<any[]> {
    return this.extraRoutesModel.getExtraRoutes();
  }

  async getExtraRouteById(id: number): Promise<any> {
    return this.extraRoutesModel.getExtraRouteById(id);
  }
}