import ExtraRoutesService from '../Services/ExtraRoutes.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

export default class ExtraRoutesController {
  private extraRoutesService = new ExtraRoutesService();

  constructor() {
    this.extraRoutesService = new ExtraRoutesService();
  }

  async createExtraRoute(req: any, res: any): Promise<any> {
    try {
      const { status, data } = await this.extraRoutesService.createExtraRoute(req.body);
      if (status !== 'CREATED') {
        return res.status(mapStatusHTTP(status)).json({ error: data });
      }
      res.status(201).json(data);
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
