import { Request, Response } from "express";
import RoutesService from "../Services/Routes.service";
import mapStatusHTTP from "../Utils/mapStatusHttp";

export default class RoutesController {
  constructor(
    private routesService: RoutesService = new RoutesService()
  ) {}

  async getOneRoute(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.routesService.getOneRoute(Number(id));
    if (status !== "SUCCESSFUL") return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async addOneCollaborator(req: Request, res: Response) {
    const { id } = req.params;
    const { collaborators } = req.body;
    const { status, data } = await this.routesService.addOneCollaborator(Number(id), collaborators);
    if (status !== "SUCCESSFUL") return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }
}