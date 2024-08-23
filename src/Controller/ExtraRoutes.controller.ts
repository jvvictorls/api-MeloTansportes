import { Error } from "sequelize";
import ExtraRoutesService from "../Services/ExtraRoutes.service";

export default class ExtraRoutesController {
  private extraRoutesService = new ExtraRoutesService();

  constructor() {
    this.extraRoutesService = new ExtraRoutesService();
  }

  async createExtraRoute(req: any, res: any): Promise<any> {
    try {
      const newExtraRoute = await this.extraRoutesService.createExtraRoute(req.body);
      res.status(201).json(newExtraRoute);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getExtraRoutes(req: any, res: any): Promise<any> {
    try {
      const extraRoutes = await this.extraRoutesService.getExtraRoutes();
      res.status(200).json(extraRoutes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getExtraRouteById(req: any, res: any): Promise<any> {
    try {
      const extraRoute = await this.extraRoutesService.getExtraRouteById(req.params.id);
      if (!extraRoute) {
        res.status(404).json({ error: 'Extra route not found' });
        return;
      }
      res.status(200).json(extraRoute);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}