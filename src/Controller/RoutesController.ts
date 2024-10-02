import { Request, Response } from 'express';
import RoutesService from '../Services/Routes.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

export default class RoutesController {
  constructor(
    private routesService: RoutesService = new RoutesService(),
  ) {}

  async getOneRoute(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.routesService.getOneRoute(Number(id));
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async getAllRoutes(req: Request, res: Response) {
    const { status, data } = await this.routesService.getAllRoutes();
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }
}
